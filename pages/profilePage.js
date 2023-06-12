import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView , TouchableOpacity} from 'react-native';
import RepoBox from '../components/repoBox';
import {SvgUri} from "react-native-svg";
import { NavigationContainer ,useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const ProfilePage = ({ route }) => {
  const navigation=useNavigation();

  const { token } = route.params;
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  const getUserData = async () => {
    try {
      const response = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Token request failed with status: ${response.status}`);
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getUserRepos = async () => {
    try {
      const response = await fetch('https://api.github.com/user/repos', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Token request failed with status: ${response.status}`);
      }

      const reposData = await response.json();
      setRepos(reposData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getUserData();
    getUserRepos();
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      {user && (
        <ScrollView contentContainerStyle={styles.profileContainer}>
          <Image style={styles.avatar} source={{ uri: user.avatar_url }} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>@{user.login}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
          <Text style={styles.location}>{user.location}</Text>
          {/* <SvgUri style={styles.ghchart} width="80% " uri= {"https://ghchart.rshah.org/"+user.login}  /> */}
          <SvgUri style={styles.ghchart} width="80%" uri= {"https://ghchart.rshah.org/"+user.login}  />
          <TouchableOpacity style={styles.touchOp} onPress={() => navigation.navigate('starredRepos',{token:token})}>
                <Text style={styles.starredRepos}>Starred Repositories</Text>
            </TouchableOpacity>


          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Repositories</Text>
              <Text style={styles.statValue}>{user.public_repos}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Starred</Text>
              <Text style={styles.statValue}>{user.starred_url.length}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Followers</Text>
              <Text style={styles.statValue}>{user.followers}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Following</Text>
              <Text style={styles.statValue}>{user.following}</Text>
            </View>
          </View>

          <View style={styles.reposContainer}>


            <Text style={styles.reposHeading}>Repositories</Text>


            {repos.map((repo, index) => (
          <RepoBox key={index.toString()} repo={repo} />
            ))}
            {/* {repos.length > 0 ? (
              repos.map((repo) => <RepoBox key={repo.id} repo={repo} />)
            ) : (
              <Text style={styles.noReposText}>No repositories found.</Text>
            )} */}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    ghchart:{
        width: 550,
        backgroundColor: '#FFFFFF',
    }
    ,
    profileContainer: {
      alignItems: 'center',
      paddingVertical: 20,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    username: {
      fontSize: 16,
      marginBottom: 10,
    },
    bio: {
      fontSize: 16,
      marginBottom: 10,
    },
    location: {
      fontSize: 16,
      marginBottom: 10,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
      paddingHorizontal: 10,
      backgroundColor: '#FFFFFF',
  
    },
    statItem: {
      alignItems: 'center',
      padding: 10,
      borderRadius: 8,
    },
    statLabel: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    statValue: {
      fontSize: 16,
    },
    reposContainer:{
        width: '80%',
        // height: 80,
    },
    touchOp:{
        backgroundColor: 'gold',
        width: '80%',
        padding: 10,
        // marginBottom: 10,
        marginTop: 20,
    },
  });
export default ProfilePage;
