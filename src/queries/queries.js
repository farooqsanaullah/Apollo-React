
import { gql } from '@apollo/client';

export const FECTH_ALL_POST=gql`{
    getPosts
    {
        id 
        body
        commentCount
        likeCount
        commentCount
    }
    
    }`;