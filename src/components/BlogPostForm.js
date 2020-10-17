import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function BlogPostForm({ onSubmit, initialValues }) {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  return (
    <View style={styles.create}>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
      />
      <Button title="Save Blog Post" onPress={() => onSubmit(title, content)} />
    </View>
  );
}

const styles = StyleSheet.create({
  create: {
    marginTop: 5,
    paddingHorizontal: 10
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    fontSize: 18,
    marginBottom: 15,
    padding: 5
  },
  label: {
    fontSize: 20,
    marginBottom: 5
  }
});

BlogPostForm.defaultProps = {
  initialValues: {
    title: '',
    content: ''
  }
};

export default BlogPostForm;
