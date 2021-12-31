import React, { useState, useEffect } from "react";
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
import Colors from '@constants/Colors';
import { dataTest } from '@assets/dataTest';
import { useNavigation } from '@react-navigation/native';

type StyledListChatProps = {
  listUsers?: [];
};


export default ListChat = (props: StyledListChatProps) =>{
    const navigation = useNavigation();
    const [isSeen, setIsSeen] = useState(true);
    // useEffect(() => {
      
    // },[])
    // const { listUsers } = props;
    // if(item.id % 2 == 0) {
      //   setIsNew(!isSeen);
      // }
    const renderUser = ({item})=>{   
      // if (Math.floor(Math.random() * 10) % 2 === 0){
      //   setIsSeen(true);
      // }else{
      //   setIsSeen(false);
      // };
      return(
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.oneUserContainer}
            onPress={() => {
              navigation.navigate('ChatRoom', {data: item} );
              // Alert.alert('clicked' + item.id);
            }}>
              <View style={styles.leftOneUser}>
                <Image
                  style={styles.avaUser}
                  resizeMode="cover"
                  source={item.image}
                />
                {!isSeen ? (
                <View style={styles.nameAndMes}>
                  <Text style={[styles.nameUser, {fontWeight: '600'}]} numberOfLines={1}>{item.name}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[styles.messageUser, {fontWeight:'600', color: 'black'}]} numberOfLines={1}>{item.message}</Text>
                      <Text style={[styles.messageUser, {fontWeight:'600', color: 'black'}]}> .22:58</Text>
                    </View>
                </View>) : (
                  <View style={styles.nameAndMes}>
                    <Text style={[styles.nameUser]} numberOfLines={1}>{item.name}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[styles.messageUser]} numberOfLines={1}>{item.message}</Text>
                      <Text style={[styles.messageUser]}> .22:58</Text>
                    </View>
                  </View>
                  )}
              </View>
              {!isSeen ? (
                <View style={styles.rightOneUser}>
                  <Ionicons name='ellipse' size={14} color={'#0941f2'} />
                </View>
              ): null}
              
          </TouchableOpacity>
      )
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={dataTest}
          keyExtractor={item => item.id}
          renderItem={(item) => renderUser(item)}
          showsVerticalScrollIndicator={false}
        />
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
    fontSize: '16@ms0.3',
  },
  messageUser:{
    color: Colors.GREY_TEXT,
    marginVertical: '5@s',
    maxWidth: '80%',
  }
});