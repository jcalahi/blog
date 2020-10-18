import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_BLOGPOST': {
      return state.filter((item) => item.id !== action.payload);
    }
    case 'EDIT_BLOGPOST': {
      return state.map((blogPost) =>
        blogPost.id === action.payload.id ? action.payload : blogPost
      );
      // other solution
      const idx = state.findIndex((item) => item.id === action.payload.id);
      return [
        ...state.slice(0, idx),
        {
          ...state[idx],
          title: action.payload.title,
          content: action.payload.content
        },
        ...state.slice(idx + 1)
      ];
    }
    case 'GET_BLOGPOSTS': {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get('/blogposts');
    dispatch({ type: 'GET_BLOGPOSTS', payload: response.data });
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, fn) => {
    await jsonServer.post('/blogposts', { title, content });

    if (fn) {
      fn();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: 'DELETE_BLOGPOST', payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, fn) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });
    dispatch({ type: 'EDIT_BLOGPOST', payload: { id, title, content } });
    if (fn) {
      fn();
    }
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
