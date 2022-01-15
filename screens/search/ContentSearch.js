import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Alert
} from "react-native";
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
// import ListChat from "@components/ListChat";
import Colors from '@shared/Colors';
import { auth, db } from '../../firebase';
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import GlobalContext from "../../context/Context";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
// import firebase from 'firebase';

const {width, height} = Dimensions.get('window');
interface SearchStyle {
  value?: string;
}

const ContentSearch = (props: SearchStyle)=> {
    const navigation = useNavigation();
    const {value} = props;
    const { currentUser } = auth;
    const [resultSearch, setResultSearch] = useState([]);
    const [isSearch, setIsSearch] = useState(1);
    const { unfilteredRooms, rooms } = useContext(GlobalContext);

    const userQuery = query(
      collection(db, "users"),
      where("displayName", "!=", currentUser.displayName),
      where('displayName', '==', value )
    );

    const userAllQuery = query(
      collection(db, "users"),
      where("email", "!=", currentUser.email)
    );

  const searchingUsers = ()=>{
    setIsSearch(2);
    if(value == '' || value == undefined){
      const unsubscribe = onSnapshot(userAllQuery, (userQuery) => {
        const parsedChats = userQuery.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        if(parsedChats != ''){
          setResultSearch(parsedChats);
          setIsSearch(1);
        }
        // else{
        //   setTimeout(() =>setIsSearch(3), 5000);
        // }
      });
    }else{
      const unsubscribe = onSnapshot(userQuery, (userQuery) => {
        const parsedChats = userQuery.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // console.log(parsedChats);
        if(parsedChats != ''){
          setResultSearch(parsedChats);
          setIsSearch(1);
        }
        // else{
        //   // setIsSearch(2);
        //   console.log(parsedChats);
        //   setTimeout(() =>setIsSearch(3), 6000);
        // }
      });
    }
  }
    
    useEffect(() => { 
      searchingUsers();
    }, [value]);

    const contentView = () => {
        if (isSearch == 2) {
          return (
            <View style={styles.loaderStyle}>
              <ActivityIndicator size="large" color="#aaa" />
            </View>
          );
        }
        if (isSearch == 3) {
          return (
            <View style={styles.contentViewEmpty}>
              <Image style={{ height: 180, width: 180 }} source={require('@assets/images/emptyProduct.png')} />
              <Text>Không tìm thấy kết quả nào!!!</Text>
            </View>
          );
        }
        return (
          <View style={styles.listChatView}>
            <FlatList
                data={resultSearch}
                keyExtractor={item => item.id}
                renderItem={(item) => renderUser(item)}
                showsVerticalScrollIndicator={false}
            />
          </View>
        );
    };

    const renderUser = ({item})=>{
      // console.log(item.email);
      
      return(
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.oneUserContainer}
            onPress={() => {
              const room = unfilteredRooms.find((room) =>{
                return room.participantsArray.includes(item.email) == true;
              });
              // console.log(room.id);
              const data = {
                userB: item,
                roomId: '',
                hasRoom: false
              }
              if(!room){
                const randomId = nanoid();
                data.roomId = randomId;
                data.hasRoom = false;
              }else{
                data.roomId = room.id;
                data.hasRoom = true;
              } 
              // console.log('-------------------------------------------start---------------------------------------------');
              // console.log(item);
              // console.log('-------------------------------------------end---------------------------------------------'); 
              navigation.navigate("ChatRoom", {data: data});
            }}>
            <View style={styles.contentOneView}>
                <Image
                    style={styles.avaUser}
                    resizeMode="cover"
                    source={{uri: item.photoURL}}
                />
                <View style={styles.nameView}>
                    <Text style={styles.nameUser} numberOfLines={1}>{item.displayName}</Text>
                </View>
            </View>
            
        </TouchableOpacity>
      )
    };
    return(
        <View style={{flex: 1}}>
          {contentView()}
        </View>
    )
}

const styles = ScaledSheet.create({
  
  listChatView:{
    width: "100%",
    flex: 1,
    borderColor: '#ccc',
    borderTopWidth: 0.8,
    // backgroundColor: 'red'
  },
  contentOneView:{
    width: '100%',
    marginTop: '10@s',
    height: '50@s',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: Colors.PRIMARY_BUTTON
  },
  contentViewEmpty: {
    flex: 1,
    alignItems: 'center',
    marginTop: '50@s'
  },
  avaUser:{
    height: '40@s',
    width: '40@s',
    borderRadius: 50,
    borderWidth: 0.8,
    borderColor: '#ccc'
  },
  nameView:{
    //   backgroundColor: 'red',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingLeft: '10@s',
    marginLeft: '10@s',
  },
  nameUser:{
      color: 'black',
      fontSize: '18@ms0.3',
      fontWeight: '700'
  }
});
export default ContentSearch;