import React, { useState, useEffect } from "react";
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
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from "react-native";
import Colors from '@shared/Colors';
import { auth, db } from '../../firebase';
import { ScaledSheet, scale } from 'react-native-size-matters';
import PrimaryInput from '@components/genaral/PrimaryInput';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { doc, setDoc } from "@firebase/firestore";
import { updateProfile } from "firebase/auth";
import { pickImage, askForPermissionCam, askForPermissionMedia, getImage , uploadImage } from "@shared/utils";

export default function EditInforScreen({ navigation }) {
  const [name, setName] = useState(auth.currentUser.displayName);
  const [nameAlert, setNameAlert] = useState(null);
  const [isProcess, setIsProcess] = useState(true);
  const user = auth.currentUser;
  const [selectedImage, setSelectedImage] = useState(user.photoURL);
  const [permissionStatusCam, setPermissionStatusCam] = useState(null);
  const [permissionStatusMedia, setPermissionStatusMedia] = useState(null);
  const default_avatar = 'https://www.teenwiseseattle.com/wp-content/uploads/2017/04/default_avatar.png';

  useEffect(() => {
    // console.log(auth.currentUser.photoURL);
    (async () => {
      if(permissionStatusCam != true ) {
        const status = await askForPermissionCam();
        setPermissionStatusCam(status);
      }
      if(permissionStatusMedia != true) {
        const statusM = await askForPermissionMedia();
        setPermissionStatusMedia(statusM);
      }
      // setSelectedImage();
      checkName();
    })();
  }, [selectedImage]);

  async function handleProfilePicture() {
      const result = await pickImage();
      if (!result.cancelled) {
        setSelectedImage(result.uri);
      }
  }

  async function handleGetPicture() {
      const result = await getImage();
      if (!result.cancelled) {
        setSelectedImage(result.uri);
      }
  }
  
  const checkName = () =>{
    Keyboard.dismiss();
    if(name != undefined){
      setName(name.trim());
      if(name == null || name.length == 0){
        setNameAlert('Tên không được bỏ trống!');
      }else{
        setNameAlert('');
        return true;
      }
    }
    return false;
  }

  const onDone = async () => {
    Keyboard.dismiss();
    
    setIsProcess(false);
    if(checkName()) {
      let photoURL;
      if (selectedImage) {
        const { url } = await uploadImage(
          selectedImage,
          `images/${user.uid}`,
          "profilePicture"
        );
        photoURL = url;
      }
      const userData = {
        displayName: name,
        email: user.email,
      };
      if (photoURL) {
        userData.photoURL = photoURL;
      }else{
        userData.photoUR = default_avatar;
      }

      await Promise.all([
        updateProfile(user, userData),
        setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
      ]);

      Alert.alert(
        'Thông báo',
        'Cập nhật thành công!'
      );  
      setIsProcess(true);
      navigation.reset({
        index: 2,
        routes: [{ name: 'Home' }],
      });
    }else{
      Alert.alert('Thông báo',`Tên không hợp lệ!`);
      setIsProcess(true);
    }
  }


  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
          { auth.currentUser.displayName ? 
          (<TouchableOpacity style={styles.searchBtn} onPress={() =>{navigation.goBack();}}>
            <Ionicons name='chevron-back-outline' size={28} color={Colors.light.text}/>
          </TouchableOpacity>): null}
            <Text style={styles.header}>Cập nhật thông tin</Text>
          <TouchableOpacity style={[styles.btnDone, {flexDirection: 'row'}]} onPress={onDone}>
            <Text style={[styles.done, {marginRight: 5 }]}>Xong</Text>
            {!isProcess ? <ActivityIndicator size="small" color={Colors.PRIMARY_BUTTON} /> : null}
          </TouchableOpacity>
        </View>
        <View style={styles.contentView}>
          <View style={styles.ImageChoseView}>
            <Image
              style={styles.avaUser}
              resizeMode="cover"
              source={{uri: selectedImage || default_avatar}}
            />
            <TouchableOpacity style={styles.iconCameraPlus} activeOpacity={0.7} onPress={handleGetPicture}>
              <MaterialCommunityIcons name={'camera-plus'} size={28}/>
            </TouchableOpacity>
          </View>
          <View style={styles.btnChose}>
            <TouchableOpacity style={styles.btnDonea} onPress={handleGetPicture}>
              <Text style={styles.donea}>Chọn ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDonea} onPress={handleProfilePicture}>
              <Text style={styles.donea}>Chụp ảnh</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.name}>
            <Text style={styles.label}>Tên</Text>
            <PrimaryInput
                alert={nameAlert}
                onChangeText={setName}
                placeholder={'Tên'}
                onBlurHandle={checkName}
                value={name}
                style={{backgroundColor: '#FFFFFF'}}
            />
          </View>  
        </View>
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
  },
  header:{
    color: Colors.light.text,
    fontWeight: 'bold',
    fontSize: 24,
    flex: 1,
    paddingLeft:'5@s'
  },
  contentView:{
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  avaUser:{
    height: '180@s',
    width: '180@s',
    borderRadius: '180@s',
    borderColor: '#ccc',
    borderWidth: 0.8,
  },
  btnChose:{
    width: '80%',
    height: '40@s',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    // marginVertical: '20@s',
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
    width: '100%',
    marginTop: '10@s'
  },
  label:{
    fontWeight: '700',
    fontSize: 16,
    marginBottom: '10@s',
    marginLeft: '40@s',
},
  iconCameraPlus:{
    backgroundColor: '#ddd',
    height: '40@s',
    width: '40@s',
    borderRadius: '40@s',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '15@s',
    right: '55@s',
    borderColor: '#fff',
    borderWidth: 0.8,
}
});