import axios from 'axios';

const url = 'http://localhost:5000/post';

export const fetchPosts = () => axios.get(url); 
// as our url return all posts that are present in our database

export const createPost = (newPost) => axios.post(url, newPost);

// api call for our update post routes
export const updatePost = (id,updatedPost) => {
    return axios.patch(`${url}/${id}`,updatedPost);
}

export const deletePost = (id)=> axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
