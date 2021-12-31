import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '@constants/Colors';
import { useNavigation } from '@react-navigation/native';
import PrimaryInput from '@components/genaral/PrimaryInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ListChat from "@screens/home/ListChat";

const {width, height} = Dimensions.get('window');

const ChatRoomScreen = ({route})=> {
    const navigation = useNavigation();
    const [user, setUser] = useState(route.params.data);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerView}>
                <TouchableOpacity style={styles.searchBtn} onPress={() =>{
                    navigation.goBack();
                    }}>
                    <Ionicons name='chevron-back-outline' size={28} color={Colors.light.text}/>
                </TouchableOpacity>
                <Image
                  style={styles.avaUser}
                  resizeMode="cover"
                  source={user.image}
                />
                <Text style={styles.fullNameText} numberOfLines={1}>{user.name}</Text>
                <View style={styles.iconHeader}>
                    <TouchableOpacity style={styles.searchBtn} onPress={() =>{
                    navigation.navigate('Search');
                    }}>
                    <Ionicons name='alert-circle-outline' size={28} color={Colors.light.text} style={{marginLeft: 15}}/>
                    </TouchableOpacity>          
                </View>
            </View>
                <View style={styles.contentChatView}>
                  <View style={styles.listChatView}>
                      <ListChat />
                  </View>
                  <KeyboardAvoidingView 
                      style={styles.keyboardView}
                      behavior={Platform.OS === 'ios' ? "padding": "height"}
                      keyboardVerticalOffset={scale(70)}
                    >
                        <View style={styles.bottomChatView}>
                            <TextInput placeholder="Enter chat" style={styles.chatInput}/>
                        </View>
                    </KeyboardAvoidingView>
            </View>     
      </SafeAreaView>
    )
};

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
      marginBottom: '10@s',
      justifyContent: 'space-between',
      paddingHorizontal: '10@s',
    //   backgroundColor: 'green'
    },
    avaUser:{
        height: '30@s',
        width: '30@s',
        borderRadius: 50,
        marginHorizontal: '10@s',
        borderColor: '#ccc',
        borderWidth: 0.8
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
      fontSize: 20,
      flex: 1,
    },
    contentChatView:{
        width: '100%',
        flex: 1,
        // backgroundColor: 'red'
    },
    listChatView:{
      // backgroundColor: 'red',
      width: "100%",
      paddingHorizontal: '10@s',
      flex: 1,
      borderTopColor: '#ccc',
      borderTopWidth: 0.8,
      borderBottomColor: '#ccc',
      borderBottomWidth: 0.5,
    },
    bottomChatView:{
        height: '50@s',
        width: '100%',
        // backgroundColor: 'green'
    },
    chatInput:{
      height: '100%',
      width: '100%',
    },
    keyboardView:{
      // backgroundColor: 'yellow',
    }
});

export default ChatRoomScreen;