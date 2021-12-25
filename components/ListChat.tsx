import React, { useState } from "react";
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

type StyledListChatProps = {
  listUsers?: [];
};


export default ListChat = (props: StyledListChatProps, {navigation}) =>{
    // const { listUsers } = props;
    const renderUser = ({item})=>{
      return(
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.oneUserContainer}
            onPress={() => {
              // navigation.push('ProductDetailsScreen', { item });
              Alert.alert('clicked' + item.id);
            }}>
              <View style={styles.leftOneUser}>
                <Image
                  style={styles.avaUser}
                  resizeMode="cover"
                  source={item.image}
                />
                <View style={styles.nameAndMes}>
                  <Text style={styles.nameUser} numberOfLines={1}>{item.name}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.messageUser} numberOfLines={1}>{item.message}</Text>
                    <Text style={styles.messageUser}> .22:58</Text>
                  </View>
                </View>
              </View>
              <View style={styles.rightOneUser}>
                <Ionicons name='ellipse' size={14} color={'#0941f2'} />  
                {/* <Text style={styles.messageUser}>22:58</Text> */}
              </View>
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