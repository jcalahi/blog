import createDataContext from './createDataContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BLOGPOST': {
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content
        }
      ];
    }
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
    default: {
      return state;
    }
  }
};

const addBlogPost = (dispatch) => {
  return (title, content, fn) => {
    dispatch({ type: 'ADD_BLOGPOST', payload: { title, content } });
    if (fn) {
      fn();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({ type: 'DELETE_BLOGPOST', payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return (id, title, content, fn) => {
    dispatch({ type: 'EDIT_BLOGPOST', payload: { id, title, content } });
    if (fn) {
      fn();
    }
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { addBlogPost, deleteBlogPost, editBlogPost },
  [{ title: 'A New title', content: 'Some content for this blog', id: '1' }]
);
