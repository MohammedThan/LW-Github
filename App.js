
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer ,useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from "./pages/loginPage.js"
import starredRepos from "./pages/starredRepos.js"
import ProfilePage from "./pages/profilePage.js"



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName=''>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="starredRepos" component={starredRepos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;