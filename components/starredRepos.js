import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import RepoBox from './repoBox';
import axios from 'axios';

export default function StarredRepos({ theData }) {
  // const { theData } = route.params;
  // const [starredRepos, setStarredRepos] = useState([]);

  // const getStarredRepos = async () => {
  //   const response = await fetch('https://api.github.com/user/starred', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       accept: 'application/vnd.github.v3+json',
  //     },
  //   });

  //   if (!response.ok) {
  //     throw new Error(`Token request failed with status: ${response.status}`);
  //   }

  //   const starredData = await response.json();
  //   console.log(starredData);
  //   return starredData;
  // };


  // const getStarredRepos = async () => {
  //   const fuserSR= await axios.get(`https://getstarred-e5ufdk7m4q-uc.a.run.app`,{
  //     params: {
  //       token: token,
  //     },
  //     });
  //   // console.log(fuserSR.data);
  //   setStarredRepos(fuserSR.data);
  // };

  // useEffect(() => {


  //   getStarredRepos();

    // const fetchToken = async () => {
    //   try {
    //     const temp = await getStarredRepos();
    //     setStarredRepos(temp);
    //     console.log(temp);
    //   } catch (error) {
    //     console.log('Error:', error);
    //   }
    // };

    // fetchToken();
  // }, []);

  return (
      <View>
        {theData.map((repo, index) => (
          <RepoBox key={index.toString()} repo={repo} />
        ))}
      </View>
  );
}
