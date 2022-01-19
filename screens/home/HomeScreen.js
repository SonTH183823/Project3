import React, { useState, useEffect, useContext, } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ListChat from "@screens/home/ListChat";
import Colors from '@shared/Colors';
import { auth, db } from '../../firebase';
import GlobalContext from "../../context/Context";
import { useIsFocused } from '@react-navigation/native';
import { collection, onSnapshot, query, where } from "@firebase/firestore";

const {width, height} = Dimensions.get('window');
const default_avatar = 'https://www.teenwiseseattle.com/wp-content/uploads/2017/04/default_avatar.png';

const HomeScreen = ({navigation})=> {
  const myInfo = ()=>{
    navigation.navigate('MyInfor', {name: user.displayName, image: user.photoURL, email: user.email, isMe: true });
  }
  const { currentUser } = auth;
  
  const { rooms, setRooms, unfilteredRooms, setUnfilteredRooms } = useContext(GlobalContext);
  const [isLoading, setIsLoading]= useState(true);
  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsArray", "array-contains", currentUser.email)
  );
  useEffect(() => {
    setIsLoading(false);
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc
          .data()
          .participants.find((p) => p.email !== currentUser.email),
      }));
      setUnfilteredRooms(parsedChats);
      setRooms(parsedChats);
      setRooms(parsedChats.filter((doc) => doc.id).sort((a, b) =>{
        if(b.lastMessage && a.lastMessage){
          return (b.lastMessage?.createdAt.seconds - a.lastMessage?.createdAt.seconds);
        }else if(b.lastMessage){
          return (b.lastMessage.createdAt.seconds - Math.round(new Date().getTime()/1000));
        }
      }));
      setIsLoading(true);
    });
    return () => unsubscribe();
  }, []);
  
  const isFocused = useIsFocused();
  const [user,setUser] = useState(auth.currentUser);
  // console.log(user.photoURL);
  useEffect(() => {
    setUser(auth.currentUser);
    }, [isFocused])
    return(
      <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
          <TouchableOpacity activeOpacity={0.7} style={styles.avaAndNameView} onPress={myInfo}>
            <Image
              style={styles.avaUser}
              resizeMode="cover"
              source={{uri: user.photoURL || default_avatar}}
            />
            <Text style={styles.fullNameText} numberOfLines={1}>{user.displayName}</Text>
          </TouchableOpacity>
          <View style={styles.iconHeader}>
            <TouchableOpacity style={[styles.searchBtn, {marginRight: 10}]} onPress={() =>{
              navigation.navigate('Search');
            }}>
              <Ionicons name='search-outline' size={32} color={Colors.light.text} style={{marginLeft: 15}}/>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.searchBtn} onPress={() =>{
              navigation.navigate('ImageClassify');
            }}>
              <Ionicons name='camera-outline' size={30} color={Colors.light.text} style={{marginHorizontal: 15}}/>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name='person-circle-outline' size={34} color={Colors.light.text} onPress={myInfo}/>
            </TouchableOpacity>           
          </View>
        </View>
        <View style={styles.listChatView}>
          {!isLoading ? 
            <ActivityIndicator size="large" color={Colors.GREY_TEXT} style={{marginTop: 20}} /> : <ListChat />
          }
        </View>
      </SafeAreaView>
    )
}

const styles = ScaledSheet.create({
  container:{
    width: '100%',
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingTop: '25@s',
  },
  headerView:{
    width: '100%',
    height: '40@s',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '10@s',
    justifyContent: 'space-between',
    paddingHorizontal: '10@s',
  },
  iconHeader:{
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  searchBtn:{
    alignContent: 'center',
    justifyContent: 'center',
  },
  fullNameText:{
    color: Colors.light.text,
    fontWeight: 'bold',
    fontSize: 28,
    flex: 1,
  },
  listChatView:{
    paddingHorizontal: '10@s',
    width: "100%",
    flex: 1,
    borderTopColor: '#ccc',
    borderTopWidth: 0.8
  },
  avaAndNameView:{
    // backgroundColor: 'red',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avaUser:{
    height: '40@s',
    width: '40@s',
    borderRadius: 50,
    marginHorizontal: '10@s',
    borderColor: '#ccc',
    borderWidth: 0.8,
},
});
export default HomeScreen;