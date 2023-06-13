import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView , TouchableOpacity, StatusBar,Fragment} from 'react-native';
import RepoBox from '../components/repoBox';
import {SvgUri} from "react-native-svg";
import { NavigationContainer ,useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import CustomSwitch from "../components/CustomSwitch.js"
import StarredRepos from "../components/starredRepos.js"


const ProfilePage = ({ route }) => {

  const { token } = route.params;
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [starredRepos, setStarredRepos] = useState([]);

  const getStarredRepos = async () => {
    const fuserSR= await axios.get(`https://getstarred-e5ufdk7m4q-uc.a.run.app`,{
      params: {
        token: token,
      },
      });
    // console.log(fuserSR.data);
    setStarredRepos(fuserSR.data);
  };


  const [tab,setTab]=useState(1)
  const onSelect=(value)=>{ 
    setTab(value); 
    console.log(value);
  }

  const navigation=useNavigation();


  // const getUserData = async () => {
  //   try {
  //     const response = await fetch('https://api.github.com/user', {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Token request failed with status: ${response.status}`);
  //     }

  //     const userData = await response.json()
  //     console.log("userData");
  //     console.log(userData);
  //     setUser(userData);
  //     console.log(user);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  // const getUserRepos = async () => {
  //   try {
  //     const response = await fetch('https://api.github.com/user/repos', {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Token request failed with status: ${response.status}`);
  //     }

  //     const reposData = await response.json();
  //     setRepos(reposData);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  const getUserData = async () => {
    const fuserData= await axios.get(`https://getuser-e5ufdk7m4q-uc.a.run.app`,{
        params: {
          token: token,
        },
        });
      // console.log(fuserData.data);
      setUser(fuserData.data);
  }

  const getUserRepos = async () => {
    const fuserRepo= await axios.get(`https://getrepos-e5ufdk7m4q-uc.a.run.app`,{
        params: {
          token: token,
        },
        });
      // console.log(fuserRepo.data);
      setRepos(fuserRepo.data);
  }




  useEffect(() => {

    // const myFetch = async () => {
      console.log("token");
      console.log(token);
    //   const fuserData= await axios.get(`https://getuser-e5ufdk7m4q-uc.a.run.app`,{
    //     params: {
    //       token: token,
    //     },
    //     });
      
    //   console.log("fuserData");

    //   console.log(fuserData.data);
    //   setUser(fuserData.data);
    //   console.log("user");

    //   console.log(user);

    //   // console.log(`tokenData: ${tokenData.text()}`)
    //   navigation.replace('ProfilePage', { token: tokenData });
    // };

    // myFetch();

    getUserData();
    getUserRepos();
    getStarredRepos();



  }, [token]);

  return (

      <SafeAreaView style={styles.container}>

        {user && (
          <ScrollView contentContainerStyle={styles.profileContainer}>

            <View style={styles.bView}>
              <Image style={styles.avatar} source={{ uri: user.avatar_url }} />
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.username}>@{user.login}</Text>
              {/* <Text style={styles.bio}>{user.bio}</Text> */}
            </View>
            
            <View style={styles.statsContainer}>
              {/* <View style={styles.statItem}>
                <Text style={styles.statLabel}>Repositories</Text>
                <Text style={styles.statValue}>{user.public_repos}</Text>
              </View> */}
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{user.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{user.following}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
            
            <Text style={styles.reposHeading}>Contribution Chart</Text>
            <View style={styles.centerAlign}> 
              <ScrollView style={styles.ghchart} horizontal={true}> 
                <SvgUri uri= {"https://ghchart.rshah.org/"+user.login}  />
              </ScrollView>
            </View>

            {/* <TouchableOpacity style={styles.touchOp} onPress={() => navigation.navigate('starredRepos',{token:token})}>
                  <Text style={styles.starredRepos}>Starred Repositories</Text>
            </TouchableOpacity> */}


            <CustomSwitch style={styles.switch} selectionMode={1} option1={"Repositories"} option2={"starred"} onSelectSwitch={onSelect}/>



              {/* <Text style={styles.reposHeading}>Repositories</Text> */}

              <View style={styles.centerAlign}>

              {tab==1 && repos.map((repo, index) => (
              <RepoBox key={index.toString()} repo={repo} />
              ))}
              
              {tab==2 && 
              <StarredRepos theData={starredRepos} />
              }
              
              
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
      backgroundColor: 'white',
    },
    ghchart:{
        width: "80%",
        height: 120,
        backgroundColor: '#FFFFFF',
    }
    ,
    profileContainer: {
      // alignItems: 'center',
      // paddingVertical: 20,
      borderTopColor:"white",
      borderTopWidth: 1,
      
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 120,
      margin: 20,
      borderColor: 'white',
      borderWidth: 1,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color:"white",
    },
    username: {
      fontSize: 16,
      marginBottom: 10,
      color:"white",

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
      width: "100%",
      // marginTop: 20,
      // paddingHorizontal: 10,
      backgroundColor: '#FFFFFF',
      // padding: 10,
      // shadowColor: "#000",
      // shadowOpacity: 0.25,
      // elevation: 5,

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
        // marginTop: 20,
    },
    bView:{
      backgroundColor: "black",
      width: "100%",
      height: "16%",
      alignItems: 'center',
      // borderBottomColor: 'white',
      // borderTopWidth:8,
      // borderBottomLeftRadius: 15,
      // borderBottomRightRadius: 15,
      // paddingBottom: 30, 
    },
    reposHeading:{
      // alignContent:"flex-start",
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 10,
      color:"black",
      padding: 20,

    },
    centerAlign:{
      alignItems: 'center',
    },
    switch:{
      pading : 20,
      margin: 20,
      width:"80%"
    }
  });
export default ProfilePage;
