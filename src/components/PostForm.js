import React,{useState} from 'react';
import {Button,Form} from 'semantic-ui-react'

import {FECTH_ALL_POST} from '../queries/queries'
import {gql,useMutation} from "@apollo/client";
function PostForm() {
 
 const [value,setVales] = useState({body:''})
 
  const handleChange=(event) =>
  {
    setVales({...value,[event.target.name]: event.target.value})
  }

  const [createpost,{error}] = useMutation(CREATE_POST_MUTATION,{
    // variables:value,
    // update(_,result)
    // {
   
    //   console.log("data ",result)
      
    //   console.log(result);
    //   value.body = '';
    // }

    variables: value,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FECTH_ALL_POST,
      });

      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: FECTH_ALL_POST,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });
      value.body = '';
    },





  });
 

  const onSubmit=(event)=>{
    event.preventDefault();
    console.log(value)
    createpost()
  }
  
  


  return (
    <Form onSubmit={onSubmit}>
     <Form.Field>
      
     <Form.Input
     placeholder="hi World"
     name="body"
     onChange={handleChange}
     value={value.body}
      />
      <Button type="submit" color="teal">
       Submit 
        </Button> 
      </Form.Field> 
    </Form>

  );
}

const CREATE_POST_MUTATION = gql`
mutation createPost($body:String!){
createPost(body:$body){
  id body createdAt username
  likes{
    id username createdAt
  }
  likeCount
  comments
  {
    id body username createdAt
  }
  commentCount
}
}`

export default PostForm;
