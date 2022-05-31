import { FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes';
import * as api from '../api';

// Action Creators->
// action creators are functions that return an action and an action is just an 
// object that has the type and a payload.

export const getPosts= ()=> async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        const action = { type:FETCH_ALL, payload: data };
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}
export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        const action = { type:CREATE, payload: data };
        dispatch(action);
    } catch (error) {
        console.log(error);
        console.log(error.message);
    }
}
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type:UPDATE, payload:data});
    } catch (error) {
        console.log(error);
    }
}
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type:DELETE, payload:id });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type:UPDATE, payload:data});
    } catch (error) {
        console.log(error);
    }
}