import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const RepoBox = ({ repo }) => {
  const handleRepoPress = () => {
    Linking.openURL(repo.html_url);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleRepoPress}>
      {/* <Image source={{ uri: repo.avatarUrl }} style={styles.avatar} /> */}
      <View style={styles.content}>
        {/* <Text style={styles.name}>{key}</Text> */}
        <Text style={styles.name}>{repo.name}</Text>
        <Text style={styles.description}>{repo.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.language}>{repo.language}</Text>
          {/* <Text style={styles.stars}>{repo.stars} Stars</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  language: {
    fontSize: 12,
    color: '#777777',
  },
  stars: {
    fontSize: 12,
    color: '#777777',
  },
});


export default RepoBox;
