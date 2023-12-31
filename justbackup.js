import React from 'react';
import { Linking } from 'react-native';
import {View, Text, Image, ScrollView, TextInput,SafeAreaView,StyleSheet, TouchableOpacity} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';


// const CLIENT_ID="be56a6917c47b7c7871e"

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/be56a6917c47b7c7871e',
};

// function loginWithGithub(){
//  Linking.openURL("https://github.com/login/oauth/authorize?client_id="+CLIENT_ID )
// }

const App = () => {

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'be56a6917c47b7c7871e',
      scopes: ['user','repo'],
      redirectUri: makeRedirectUri({
        scheme: 'your.app'
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log(code)
      console.log(response.params)
    }
  }, [response]);

  
  return (

    <SafeAreaView style={styles.container}>
        <View>
          <Image 
            style={styles.image}
            source={
              require('./assets/github-logo.png')} />
        </View>

        <View> 
          <TouchableOpacity style={styles.button} onPress={() => {
              promptAsync();
            }} 
            disabled={!request}
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



// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Hi, Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
