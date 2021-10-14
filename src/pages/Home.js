import React,{useContext} from 'react';
import {  useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';
import { AuthContext } from '../Context/auth'
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import {FECTH_ALL_POST} from '../queries/queries'
function Home() {
const {loading,data,error} = useQuery(FECTH_ALL_POST);
const {user} = useContext(AuthContext)
if(data){
	console.log(data)
}

  return (
	 
  	<Grid columns={3} >
    <Grid.Row> <h1>Recent Posts</h1> </Grid.Row>
    <Grid.Row>
      {user && (
         <Grid.Column>
           <PostForm/>
         </Grid.Column>
      )}
      {loading?(<h1> loading ...</h1>):(data && data.getPosts.map(post=>(

      <Grid.Column key={post.id} style={{marginBottom:20}}>
		<PostCard post={post} />
         
       </Grid.Column>
      	)))}


      </Grid.Row>
	</Grid>
  );
}






export default Home;
