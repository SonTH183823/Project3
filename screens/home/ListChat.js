import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
  Alert,
  FlatList
} from "react-native";
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '@shared/Colors';
import { useNavigation } from '@react-navigation/native';
import GlobalContext from "../../context/Context";
import {formatTime} from "@shared/formatTime";



export default ListChat = () =>{
    const navigation = useNavigation();
    const [isSeen, setIsSeen] = useState(true);
    const { unfilteredRooms, rooms } = useContext(GlobalContext);
    const emptyChats = ()=>{
      return (
        <View style={styles.emptyChatsView}>
          <Ionicons name='chatbubble-outline' size={100} color='black'/>
          <Text style={styles.textEmptyChats}>Chưa có cuộc trò chuyện nào!!!</Text>
          <TouchableOpacity style={styles.BtnSeach} onPress={() => navigation.navigate('Search')}>
            {/* <Ionicons name='search-outline' size={26} color='white'/> */}
            <Text style={[styles.textEmptyChats, {color: 'white', marginRight: 5 }]}>Bắt đầu</Text>
            <Ionicons name='arrow-forward-circle-outline' size={24} color='white'/>
          </TouchableOpacity>
        </View>
      )
    }
    const renderUser = ({item})=>{   
    // console.log('-------------------------------------------start---------------------------------------------');
    // console.log('-------------------------------------------end---------------------------------------------');
      const oneUserB = {
        displayName: item.userB.displayName,
        lastMessage: item.lastMessage?.text || 'Cuộc trò chuyện đã được kết nối.',
        time: item.lastMessage? formatTime(item.lastMessage.createdAt.seconds): ''
      }
      return(
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.oneUserContainer}
            onPress={() => {
              const room = unfilteredRooms.find((room) =>{
                return room.participantsArray.includes(item.userB.email) == true;
              });
              const data = {
                userB: item.userB,
                roomId: room.id,
                hasRoom: true
              }
              navigation.navigate('ChatRoom', {data: data});
            }}>
              <View style={styles.leftOneUser}>
                <Image
                  style={styles.avaUser}
                  resizeMode="cover"
                  source={{uri:item.userB.photoURL}}
                />
                {!isSeen ? (
                  <View style={styles.nameAndMes}>
                    <View style={styles.topNameAndMes}>
                      <Text style={[styles.nameUser, {fontWeight: '700'}]} numberOfLines={1}>{oneUserB.displayName} <Ionicons name='ellipse' size={14} color={'#0941f2'} /></Text>
                      <Text style={[styles.messageUser, { alignItems: "flex-end", color: 'black',fontWeight: '700'}]}>{oneUserB.time}</Text>
                    </View>
                    <Text style={[styles.messageUser,{color: 'black',fontWeight: '700'}]} numberOfLines={1}>{oneUserB.lastMessage}</Text>
                  </View>
                ) : (
                  <View style={styles.nameAndMes}>
                    <View style={styles.topNameAndMes}>
                      <Text style={[styles.nameUser]} numberOfLines={1}>{oneUserB.displayName}</Text>
                      <Text style={[styles.messageUser, { alignItems: "flex-end"}]}>{oneUserB.time}</Text>
                    </View>
                      <Text style={[styles.messageUser]} numberOfLines={1}>{oneUserB.lastMessage}</Text>
                  </View>
                  )}
              </View>
          </TouchableOpacity>
      )
    }
    return (
      <View style={styles.container}>
        {
        rooms.length > 0 ? 
          <FlatList
            data={rooms}
            keyExtractor={item => item.id}
            renderItem={(item) => renderUser(item)}
            showsVerticalScrollIndicator={false}
          /> : emptyChats()
        }
      </View>
    );
};

const styles = ScaledSheet.create({
  container:{
    flex: 1
  },
  oneUserContainer:{
    width: '100%',
    flexDirection: 'row',  
    justifyContent: 'space-between',
    marginTop: '10@s',
    flex: 1,
  },
  leftOneUser:{
    height: '60@s',
    flexDirection: 'row',
    flex: 1,
  },
  avaUser:{
    height: '60@s',
    width: '60@s',
    borderRadius: 50,
    borderColor: '#ccc',
    borderWidth: 0.8
  },
  nameAndMes:{
    flex: 1,
    paddingLeft: '10@s',
    justifyContent: 'center'
  },
  rightOneUser:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameUser:{
    color: 'black',
    fontSize: '19@ms0.3',
    flex: 1,
  },
  messageUser:{
    color: Colors.GREY_TEXT,
    height: '50%',
    fontSize: '14@ms0.3',
    // flex: 1
    // marginVertical: '5@s',
  },
  topNameAndMes:{
    flexDirection: 'row',  
    height: '50%',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyChatsView:{
    flex: 1,
    alignItems: 'center',
    marginTop: '100@s'
  },
  textEmptyChats:{
    color: 'black',
    fontSize: 16
  },
  BtnSeach:{
    backgroundColor: Colors.PRIMARY_BUTTON,
    height: '40@s',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 40,
    marginTop: '30@s'
  }
});