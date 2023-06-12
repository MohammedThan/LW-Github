import React from 'react';
import {useState} from 'react';

import { Linking } from 'react-native';
import {View, Text, Image, ScrollView, TextInput,SafeAreaView,StyleSheet, TouchableOpacity} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';
import { NavigationContainer ,useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const CLIENT_ID="37ab602858fd75fbfa36"

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/'+CLIENT_ID,
};

// function loginWithGithub(){
//  Linking.openURL("https://github.com/login/oauth/authorize?client_id="+CLIENT_ID )
// }

const App = () => {
  const navigation=useNavigation();
  const [authToken,setAuthTokenState] = useState(0); 

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: [],
      redirectUri: makeRedirectUri({
        scheme: 'your.app'
      }),
    },
    discovery
  );

  const getToken= async (code) =>{
      const tokenRes=await fetch("https://github.com/login/oauth/access_token",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
        },
        body:JSON.stringify({
          code:code,
          client_id:CLIENT_ID,
          client_secret:"535e136ac49021e3d675aa0f9fb159497e69b77d"
        }),
      });

      if (!tokenRes.ok) {
        throw new Error(
          `Token request failed with status: ${tokenRes.status}`
        );
      }
      const tokenData= await tokenRes.json();
      // console.log(tokenData)
      // console.log(tokenData.access_token)
      return tokenData.access_token;
  }

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
  
      const fetchToken = async () => {
        const tokenData = await getToken(code);
        // console.log(tokenData)
        navigation.replace('MyTabs', { token: tokenData });
      };
  
      fetchToken();
    }
  }, [response, authToken]);

  
  return (

    <SafeAreaView style={styles.container}>
        <View>
          <Image 
            style={styles.image}
            source={
              require('../assets/github-logo.png')} />
        </View>

        <View> 
          <TouchableOpacity        disabled={!request}
            style={styles.button} onPress={() => {
              promptAsync();
            }} 
             >
            <Text style={styles.text}>Login with Github</Text>

          </TouchableOpacity>
        </View>  
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-',
    alignItems: 'center',
    justifyContent:"center",
    height: '100%',
    textAlign: 'center',
  },
  input: {
    height: "5%",
    margin: 12,
    width:"75%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,

  },
  image:
  {
    alignContent:"center",
    justifyContent:"center",
    height: 150,
    width: 150,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal:75,
    paddingVertical   : 15,
    margin:30,
    width:"100%",
    borderRadius:20,
    
  },
  text:{
    color:"white",
    fontWeight: 'bold',
    fontSize: 20,
  }
  // button:{
  //   color:"black",
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingVertical: 12,
  //   paddingHorizontal: 32,
  //   borderRadius: 4,
  //   elevation: 3,
  //   backgroundColor: 'black'
  // }
});
export default App;
