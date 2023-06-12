// import React from 'react';
// import {useState} from 'react';

// import { Linking } from 'react-native';
// import {View, Text, Image, ScrollView, TextInput,SafeAreaView,StyleSheet, TouchableOpacity} from 'react-native';
// import * as WebBrowser from 'expo-web-browser';
// import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
// import { Button } from 'react-native';
// import { NavigationContainer ,useNavigation} from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const CLIENT_ID="32fd9d061d6823753b69"

// WebBrowser.maybeCompleteAuthSession();

// const discovery = {
//   authorizationEndpoint: 'https://github.com/login/oauth/authorize',
//   tokenEndpoint: 'https://github.com/login/oauth/access_token',
//   revocationEndpoint: 'https://github.com/settings/connections/applications/'+CLIENT_ID,
// };

// // function loginWithGithub(){
// //  Linking.openURL("https://github.com/login/oauth/authorize?client_id="+CLIENT_ID )
// // }

// const App = () => {
//   const navigation=useNavigation();
//   const [authToken,setAuthTokenState] = useState(0); 

//   const [request, response, promptAsync] = useAuthRequest(
//     {
//       clientId: CLIENT_ID,
//       scopes: [],
//       redirectUri: makeRedirectUri({
//         scheme: 'your.app'
//       }),
//     },
//     discovery
//   );


//   const getAccessToken = async (code) => {
//     try {
//       console.log("Getting access token");
//       const tokenResponse = await fetch(
//         "https://github.com/login/oauth/access_token",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             client_id: CLIENT_ID,
//             client_secret: CLIENT_SECRET,
//             code: code,
//           }),
//         }
//       );

//       if (!tokenResponse.ok) {
//         throw new Error(
//           `Token request failed with status: ${tokenResponse.status}`
//         );
//       }

//       const tokenData = await tokenResponse.text();

//       const accessTokenMatch = tokenData.match(/access_token=([^&]+)/);

//       if (!accessTokenMatch) {
//         throw new Error("Access token not found i n response");
//       }

//       const accessToken = accessTokenMatch[1];

//       console.log("ACCESS TOKEN:", accessToken);
//       navigateToProfileScreen(accessToken);
//     } catch (error) {
//       console.error("Error getting access token:", error);
//     }
//   };
//   const navigateToProfileScreen = (accessToken) => {
//     console.log("Navigating to ProfileScreen");
//     navigation.navigate("Home", { accessToken });
//   };

//   React.useEffect(() => {
//     if (response?.type === 'success') {
//       const { code } = response.params;
  
//       const fetchToken = async () => {
//         const accessToken= await getAccessToken(code)
//         navigateToProfileScreen(accessToken);
//       };
  
//       fetchToken();
//     }
//   }, [response, authToken]);

  
//   return (

//     <SafeAreaView style={styles.container}>
//         <View>
//           <Image 
//             style={styles.image}
//             source={
//               require('../assets/github-logo.png')} />
//         </View>

//         <View> 
//           <TouchableOpacity        disabled={!request}
//             style={styles.button} onPress={() => {
//               promptAsync();
//             }} 
//              >
//             <Text style={styles.text}>Login with Github</Text>

//           </TouchableOpacity>
//         </View>  
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     // justifyContent: 'space-',
//     alignItems: 'center',
//     justifyContent:"center",
//     height: '100%',
//     textAlign: 'center',
//   },
//   input: {
//     height: "5%",
//     margin: 12,
//     width:"75%",
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 10,

//   },
//   image:
//   {
//     alignContent:"center",
//     justifyContent:"center",
//     height: 150,
//     width: 150,
//   },
//   button: {
//     alignItems: 'center',
//     backgroundColor: 'black',
//     paddingHorizontal:75,
//     paddingVertical   : 15,
//     margin:30,
//     width:"100%",
//     borderRadius:20,
    
//   },
//   text:{
//     color:"white",
//     fontWeight: 'bold',
//     fontSize: 20,
//   }
//   // button:{
//   //   color:"black",
//   //   alignItems: 'center',
//   //   justifyContent: 'center',
//   //   paddingVertical: 12,
//   //   paddingHorizontal: 32,
//   //   borderRadius: 4,
//   //   elevation: 3,
//   //   backgroundColor: 'black'
//   // }
// });
// export default App;



// // import { StatusBar } from 'expo-status-bar';
// // import { StyleSheet, Text, View } from 'react-native';

// // export default function App() {
// //   return (
// //     <View style={styles.container}>
// //       <Text>Hi, Open up App.js to start working on your app!</Text>
// //       <StatusBar style="auto" />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });
















const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
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
  });



















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












  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
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
  });