import axios from 'axios';
const API = axios.create({baseURL : "http://localhost:5000"}); 

API.interceptors.request.use((req)=>{
    const logProfile=localStorage.getItem('profile');
    if(logProfile)
    {
        req.headers.Authorization = `HoneySingh ${JSON.parse(logProfile).token}`; 
    }
    return req;
});

export const fetchPosts = () => API.get('/post'); 
// as our url return all post {getRequest} that are present in our database
export const createPost = (newPost) => API.post('/post', newPost);
export const updatePost = (id,updatedPost) => {
    return API.patch(`/post/${id}`,updatedPost);
}
export const deletePost = (id)=> API.delete(`/post/${id}`);
export const likePost = (id) => API.patch(`/post/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
