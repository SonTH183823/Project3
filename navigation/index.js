 import { NavigationContainer} from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import React, { useState, useEffect } from 'react';
 import { ColorSchemeName, Pressable } from 'react-native';
 
 import Colors from '@shared/Colors';
 import LoginScreen from '@screens/auth/LoginScreen';
 import ChangePassScreen from '@screens/auth/ChangePassScreen';
 import HomeScreen from '@screens/home/HomeScreen';
 import SearchScreen from '@screens/search/SearchScreen';
 import ChatRoomScreen from '@screens/chat/ChatRoomScreen';
 import ImageClassifyScreen from '@screens/more/ImageClassifyScreen';
 import SignupScreen from '@screens/auth/SignUpScreen';
 import EditInforScreen from '@screens/infor/EditInforScreen';
 import MyInfoScreen from '@screens/infor/MyInfoScreen';

 import { auth } from '../firebase';
 import { onAuthStateChanged } from "firebase/auth";

 const Stack = createNativeStackNavigator();
 

const Navigation = () => {
  const [routeName, setRouteName]= useState('Login');
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await setRouteName('Home');
      }else{
        await setRouteName('Login');
      }
    });
    return () => unsubscribe();
  }, []);

 function Root () {
   return(
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditInfor" component={EditInforScreen} options={{ headerShown: false }} /> 
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChangePass" component={ChangePassScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MyInfor" component={MyInfoScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ImageClassify" component={ImageClassifyScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
   )
 }

  // function RootNavigator () {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
  //       <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false }} />
  //     </Stack.Navigator>
  //   );
  // }
   return (
     <NavigationContainer>
       <Root />
     </NavigationContainer>
   );
 }
 
export default Navigation;