import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ListChat from "@components/ListChat";
import Colors from '@constants/Colors';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation})=> {
    return(
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.fullNameText} numberOfLines={1}>Tô Hoài Sơn</Text>
          <View style={styles.iconHeader}>
            <TouchableOpacity style={styles.searchBtn} onPress={() =>{
              navigation.navigate('Search');
            }}>
              <Ionicons name='search-outline' size={28} color={Colors.light.text} style={{marginLeft: 15}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name='camera-outline' size={30} color={Colors.light.text} style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name='reorder-four-outline' size={30} color={Colors.light.text} onPress={()=>{
              navigation.navigate('Login');
              }}/>
            </TouchableOpacity>           
          </View>
        </View>
        <View style={styles.listChatView}>
          <ListChat />
        </View>
      </View>
    )
}

const styles = ScaledSheet.create({
  container:{
    width: '100%',
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingTop: '25@s',
    paddingHorizontal: '15@s',
  },
  headerView:{
    width: '100%',
    height: '40@s',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10@s',
    justifyContent: 'space-between'
  },
  iconHeader:{
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red'
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
    // backgroundColor: 'red',
    width: "100%",
    // paddingTop: '10@s',
    flex: 1,
    borderTopColor: '#ccc',
    borderTopWidth: 0.8
  }
});
export default HomeScreen;