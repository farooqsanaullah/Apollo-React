import React,{useState,useContext} from 'react';
import {Form,Button} from 'semantic-ui-react';
import {gql,useMutation} from "@apollo/client";
import { AuthContext } from '../Context/auth';
function Login(props) {
  const context = useContext(AuthContext)
const [errors,setError] = useState('');
	const [values,setValues]= useState({
     username:'',
     password:'',
    })

    const handlerChange = (event)=>
{
   setValues({...values,[event.target.name]: event.target.value});
}

const [login,{loading}] = useMutation(LOGIN_USER,
{
	update(_,result)
	{
    
    console.log(result.data.login);
    context.login(result.data.login)
		props.history.push('/');
	},
	onError(error)
	{
        console.log(error.graphQLErrors[0].extensions.exception.errors);
        setError(error.graphQLErrors[0].extensions.exception.errors);
	}
	,variables:values
}); 

const onSubmit =(event )=>
{
console.log(values);
event.preventDefault();
login()
}







  return (
  	<>
  	<Form onSubmit={onSubmit} className={loading?'loading':''}	>
    <Form.Field  error={errors.username ? true : false}>
      <label>User Name</label>
      <input type="text" name="username" placeholder='User Name' value={values.username} onChange={handlerChange} />
    </Form.Field>
    
    <Form.Field error={errors.password ? true : false}>
      <label>Password</label>
      <input type="password" name="password" placeholder='Password' value={values.password} onChange={handlerChange} />
    </Form.Field>

    <Button type='submit'>Submit</Button>
  </Form>
  
  {Object.keys(errors).length > 0 && (

  <div className="ui error message">
  <ul className="list">
  {Object.values(errors).map(value=>(<li key={value}>{value}</li>))}

  </ul>


  </div>		

  	)};
  </>
  );
}
const LOGIN_USER = gql`
mutation login(
$username:String!
$password:String!
)
{
login(
username:$username
password:$password
)

{id username email createdAt token}

}`;

export default Login;
