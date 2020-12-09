import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
function Home() {
const {loading,data,error} = useQuery(FECTH_ALL_POST);

if(data)
{
	//console.log("data",data);
}

if(error)
{
	console.log('error',error);
}



  return (
  	<Grid columns={3} >
    <Grid.Row> <h1>Recent Posts</h1> </Grid.Row>
    <Grid.Row>
      {loading?(<h1> loading ...</h1>):(data && data.getPosts.map(post=>(

      <Grid.Column key={post.id} style={{marginBottom:20}}>
		<PostCard post={post} />
         
       </Grid.Column>
      	)))}


      </Grid.Row>
	</Grid>
  );
}

const FECTH_ALL_POST=gql`{
getPosts
{
	id 
	body

	createdAt
	likeCount
	likes
	{
		username
	}
	commentCount
	
		comments
		{
			id
			username
			createdAt
			body	
		}
	
}

}`;




export default Home;
