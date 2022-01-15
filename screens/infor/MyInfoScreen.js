import {
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    Alert,
    ScrollView
  } from "react-native";
import React, { useState, useEffect } from "react";
import Colors from '@shared/Colors';
import { ScaledSheet, scale } from 'react-native-size-matters';
import PrimaryInput from '@components/genaral/PrimaryInput';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
  
  export default function MyInfoScreen({ route }) {
    const {name, image, email, isMe} = route.params;
    // console.log(image);
    const default_avatar = 'https://www.teenwiseseattle.com/wp-content/uploads/2017/04/default_avatar.png';
    const navigation = useNavigation();
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.headerView}>
            <TouchableOpacity  onPress={() =>{navigation.goBack();}}>
              <Ionicons name='chevron-back-outline' size={28} color={Colors.light.text}/>
            </TouchableOpacity>
              <Text style={styles.header}>Thông tin tài khoản</Text>
            {isMe? 
            <TouchableOpacity style={styles.btnDone} onPress={()=>{navigation.navigate('EditInfor');}}>
              <Text style={styles.done}>Chỉnh sửa</Text>
            </TouchableOpacity> : null}
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.contentView}>
              <View style={styles.ImageChoseView}>
                <Image
                  style={styles.avaUser}
                  resizeMode="cover"
                  source={{uri: image || default_avatar}}
                />
                {/* <Text style={styles.name}>{name}</Text> */}
              </View>
              <View style={styles.information}>
                  <View style={styles.oneInfor}>
                    <View style={{ flexDirection: 'row' , alignItems: 'center', justifyContent: 'center'}}>
                      <Ionicons name='person-outline' size={24} />
                      <Text style={styles.label}>Tên</Text>
                    </View>
                    <Text style={styles.value}>{name}</Text>
                  </View>
                  <View style={styles.oneInfor}>
                    <View style={{ flexDirection: 'row' , alignItems: 'center', justifyContent: 'center'}}>
                      <Ionicons name='mail-outline' size={24} />
                      <Text style={styles.label}>Email</Text>
                    </View>
                      <Text style={styles.value}>{email}</Text>
                  </View>   
              </View>
              {isMe? (
              <View style={{width: '100%',alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ImageClassify')}>
                    <Ionicons name='image-outline' size={24} />
                    <Text style={[styles.label]}>Classify Image</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ChangePass')}>
                    <Ionicons name='key-outline' size={24} />
                    <Text style={[styles.label]}>Đổi mật khẩu</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn,{borderColor: 'red', marginBottom: 20}]} onPress={()=>{
                    Alert.alert(
                        'Đăng xuất?',
                        '',
                        [
                          { text: "Thoát", onPress: () => {
                            navigation.reset({
                              index: 0,
                              routes: [{ name: 'Login' }]
                            });
                          }},
                          { text: "Huỷ", onPress: () => {}, style: "cancel"}
                        ]
                    );   
                }}>
                    <Ionicons name='log-out-outline' size={24} />
                    <Text style={[styles.label,{marginLeft: 5}]}>Đăng xuất</Text>
                </TouchableOpacity> 
              </View>) : null}
            </View>
          </ScrollView>
        </SafeAreaView>
    );
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
      // backgroundColor: 'red'
    },
    header:{
      color: Colors.light.text,
      fontWeight: 'bold',
      fontSize: 24,
      flex: 1,
      paddingLeft:'5@s'
    },
    contentView:{
      // backgroundColor: 'red',
      paddingHorizontal: '10@s',
      width: "100%",
      alignItems: 'center',
      flex: 1,
      borderTopColor: '#ccc',
      borderTopWidth: 0.8
    },
    done:{
      color: Colors.PRIMARY_BUTTON,
      fontWeight: '700',
      fontSize: 16
    },
    lable:{
      marginTop: 20,
      marginLeft: 20,
    },
    btnDone:{
      // backgroundColor: 'red',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    ImageChoseView:{
      width: '80%',
      height: '200@s',
    //   backgroundColor: 'red',
      marginTop: '10@s',
      alignItems: 'center',
      justifyContent: 'center'
    },
    avaUser:{
      height: '150@s',
      width: '150@s',
      borderRadius: '150@s',
      borderColor: '#ccc',
      borderWidth: 0.8,
    },
    btnChose:{
      width: '80%',
      height: '40@s',
      // backgroundColor: 'red',
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      marginBottom: '20@s',
    },
    btnDonea:{
      backgroundColor: Colors.PRIMARY_BUTTON,
      height: '100%',
      borderRadius: 10,
      width: '35%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    donea:{
      color: '#fff',
      fontWeight: '400',
      fontSize: 16
    },
    name:{
        color: Colors.light.text,
        fontWeight: 'bold',
        fontSize: 28,
        flex: 1,
        marginTop: '10@s'
    },
    information:{
        width: '80%',
        // backgroundColor: 'green',

    },
    oneInfor:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '40@s',
        alignItems: 'center',
        paddingHorizontal: '10@s',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5
    },
    label:{
        fontWeight: '700',
        fontSize: 16,
        marginLeft: '5@s'
    },
    value:{
        fontWeight: '400',
        fontSize: 16
    },
    btn:{
        width: '80%',  
        flexDirection: 'row',
        justifyContent: 'center',
        height: '40@s',
        alignItems: 'center',
        paddingHorizontal: '10@s',
        marginTop: '40@s',
        borderColor: '#ccc',
        borderWidth: 0.8,
        borderRadius: 10
    }
  });