import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

function EditScreen({ navigation }) {
  const id = navigation.getParam('id');
  const { state, editBlogPost } = useContext(Context);

  const blog = state.find((item) => item.id === id);

  return (
    <BlogPostForm
      initialValues={{ title: blog.title, content: blog.content }}
      onSubmit={(title, content) => {
        editBlogPost(id, title, content, () => {
          navigation.pop();
        });
      }}
    />
  );
}

const styles = StyleSheet.create({});

export default EditScreen;
