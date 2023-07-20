# Assessment-Reactjs
src/redux/actions.js:
import axios from 'axios';

// Action Types
export const FETCH_BLOG_POSTS_SUCCESS = 'FETCH_BLOG_POSTS_SUCCESS';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const CREATE_BLOG_POST_SUCCESS = 'CREATE_BLOG_POST_SUCCESS';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';

// Action Creators
export const fetchBlogPosts = () => async (dispatch) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    dispatch({ type: FETCH_BLOG_POSTS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }
};

export const fetchComments = (postId) => async (dispatch) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    dispatch({ type: FETCH_COMMENTS_SUCCESS, payload: { postId, comments: response.data } });
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

export const createBlogPost = (post) => async (dispatch) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post);
    dispatch({ type: CREATE_BLOG_POST_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error creating blog post:', error);
  }
};

export const createComment = (comment) => async (dispatch) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/comments', comment);
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error creating comment:', error);
  }
};

--------
src/redux/reducers.js:
import { combineReducers } from 'redux';
import {
  FETCH_BLOG_POSTS_SUCCESS,
  FETCH_COMMENTS_SUCCESS,
  CREATE_BLOG_POST_SUCCESS,
  CREATE_COMMENT_SUCCESS,
} from './actions';

const blogPostsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_BLOG_POSTS_SUCCESS:
      return action.payload;
    case CREATE_BLOG_POST_SUCCESS:
      return [...state, action.payload];
    default:
      return state;
  }
};

const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS:
      return { ...state, [action.payload.postId]: action.payload.comments };
    case CREATE_COMMENT_SUCCESS:
      const postId = action.payload.postId;
      return {
        ...state,
        [postId]: state[postId] ? [...state[postId], action.payload] : [action.payload],
      };
    default:
      return state;
  }
};

export default combineReducers({
  blogPosts: blogPostsReducer,
  comments: commentsReducer,
});

----------
src/components/BlogList.js:
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogPosts } from '../redux/actions';

const BlogList = () => {
  const dispatch = useDispatch();
  const blogPosts = useSelector((state) => state.blogPosts);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  return (
    <div>
      <h1>Blog Posts</h1>
      {blogPosts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
---------
src/components/CommentList.js:
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../redux/actions';

const CommentList = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments[postId] || []);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id}>
          <h4>{comment.name}</h4>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
------------
src/components/BlogPostForm.js:
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlogPost } from '../redux/actions';

const BlogPostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBlogPost({ title, body }));
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Blog Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BlogPostForm;
------------
src/App.js
import React from 'react';
import BlogList from './components/BlogList';
import CommentList from './components/CommentList';
import BlogPostForm from './components/BlogPostForm';

const App = () => {
  return (
    <div>
      <BlogList />
      <BlogPostForm />
    </div>
  );
};

export default App;
---------
"https://jsonplaceholder.typicode.com/" 