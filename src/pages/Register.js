import React,{useState} from 'react';

import {Form,Button} from 'semantic-ui-react';

import {gql,useMutation} from "@apollo/client";



function Register(props) {


	const [errors,setError] = useState('');
	const [values,setValues]= useState({
     username:'',
     email:'',
     password:'',
     confirmPassword:''
	})

const handlerChange = (event)=>
{
   setValues({...values,[event.target.name]: event.target.value});
}

const [addUser,{loading}] = useMutation(REGISTER_USER,
{
	update(_,result)
	{
		console.log(result);
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
addUser()
}






  return (
  	<>
  	<Form onSubmit={onSubmit} className={loading?'loading':''}	>
    <Form.Field  error={errors.username ? true : false}>
      <label>User Name</label>
      <input type="text" name="username" placeholder='User Name' value={values.username} onChange={handlerChange} />
    </Form.Field>
    <Form.Field error={errors.email ? true : false}>
      <label>Email</label>
      <input type="email" name="email" placeholder='Email' value={values.email} onChange={handlerChange} />
    </Form.Field>

    <Form.Field error={errors.password ? true : false}>
      <label>Password</label>
      <input type="password" name="password" placeholder='Password' value={values.password} onChange={handlerChange} />
    </Form.Field>

    <Form.Field error={errors.confirmPassword ? true : false}>
      <label>Confirm Password</label>
      <input type="password" name="confirmPassword" placeholder='Confirm Password' value={values.confirmPassword} onChange={handlerChange} />
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


const REGISTER_USER = gql`
mutation register(
$username:String!
$email:String!
$password:String!
$confirmPassword:String!
)
{
	register(
	registerInput:{
username:$username
email:$email
password:$password
confirmPassword:$confirmPassword	
})

{id username email createdAt token}

}`;


export default Register;
