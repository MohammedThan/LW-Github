import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import RepoBox from '../components/repoBox';

export default function StarredRepos({ route }) {
  const { token } = route.params;
  const [starredRepos, setStarredRepos] = useState([]);

  const getStarredRepos = async () => {
    const response = await fetch('https://api.github.com/user/starred', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`Token request failed with status: ${response.status}`);
    }

    const starredData = await response.json();
    console.log(starredData);
    return starredData;
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const temp = await getStarredRepos();
        setStarredRepos(temp);
        console.log(temp);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchToken();
  }, []);

  return (
    <SafeAreaView>
      <View>
        {starredRepos.map((repo, index) => (
          <RepoBox key={index.toString()} repo={repo} />
        ))}
      </View>
    </SafeAreaView>
  );
}
