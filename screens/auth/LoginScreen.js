import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  Keyboard
} from "react-native";
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '@shared/Colors';
import PrimaryInput from '@components/genaral/PrimaryInput';
import PrimaryInputPass from '@components/genaral/PrimaryInputPass';
import {isEmailValid} from '@shared/validateEmail';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
 
export default function LoginScreen({ navigation}) {
  const [email, setEmail] = useState("");
  const [passAlert, setPassAlert] = useState("");
  const [emailAlert, setEmailAlert] = useState("");
  const [password, setPassword] = useState("");
  const [isProcess, setIsProcess] = useState(true);

  const checkEmail = () => {
    if(email == ''){
      setEmailAlert('Email không được bỏ trống!');
    }else{
      if(!isEmailValid(email)){
        setEmailAlert('Email không đúng định dạng!');
      }else{
        setEmailAlert('');
      }
    }
  }
  const handleLoginPress = async ()=>{
    Keyboard.dismiss();
    setIsProcess(false);
    if(email != '' && password != ''){
      signInWithEmailAndPassword( auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        if(user.displayName != undefined){
          setIsProcess(true);
          navigation.reset({
            index: 2,
            routes: [{ name: 'Home' }],
          });
        }else{
          setIsProcess(true);
          navigation.reset({
            index: 1,
            routes: [{ name: 'EditInfor' }],
          });
        }
        // setIsProcess(true);
      })
      .catch(error => {
        Alert.alert('Thông báo','Có lỗi xảy ra, hãy kiểm tra lại!');
        setIsProcess(true);
      });
    }else{
      setEmailAlert('Email không được bỏ trống!');
      setPassAlert('Mật khẩu không được bỏ trống!');
      Alert.alert('Thông báo','Hãy nhập đầy đủ thông tin!');
      setIsProcess(true);
    }
  }

  const ggLogin = ()=>{
    // var google_provider = new auth.GoogleAuthProvider();
    // auth.signInWithPopup(google_provider)
    // .then((response)=>{
    //   console.log(response);
    // })
    // .catch((error)=>{
    //   console.log(error);
    // })
  }

  const handleChangePassword =(pass)=>{
    setPassword(pass);
    if(pass.length < 6 && pass.length > 0){
      setPassAlert('Mật khẩu phải có ít nhất 6 ký tự!');
    }else if(pass == ''){
      setPassAlert('Mật khẩu không được bỏ trống!');
    }else{
      setPassAlert('');
    }
  }
  return (
    <SafeAreaView style={{width: '100%', flex: 1}}>
      <View style={styles.container}>
        {/* <Image style={styles.image} source={require("../../assets/images/logo1.jpeg")} /> */}
        <Ionicons name="chatbubbles-outline" size={150} color={'black'} />
        <Text style={styles.textLogo}>HiBae</Text>
          <PrimaryInput 
            alert={emailAlert}
            onChangeText={(email)=>{
              setEmailAlert('');
              setEmail(email);
            }}
            placeholder={'Email'}
            onBlurHandle={checkEmail}
          />

          <PrimaryInputPass
            alert={passAlert}
            onChangeText={(pass)=>{
              handleChangePassword(pass)
            }}
            placeholder={'Mật khẩu'}
          />

        <TouchableOpacity style={styles.forgotPassView}>
          <Text style={styles.forgot_button}>Quên mật khẩu?</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.loginBtn} onPress={handleLoginPress}>
          <Text style={styles.loginText}>Đăng nhập</Text>
          {!isProcess ? <ActivityIndicator size="small" color="#fff" /> : null}
        </TouchableOpacity>
        
        <Text style={styles.text}>━━━━━━━━    HOẶC    ━━━━━━━━</Text>

        <View style={styles.loginWithView}>
          <TouchableOpacity style={styles.loginWithBtn} onPress={ggLogin}>
            <Ionicons name='logo-google' size={26} color='white'/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginWithBtn}>
            <FontAwesome name='facebook' size={26} color='white'/>
          </TouchableOpacity>       
        </View>        
      </View>
      <View style={styles.signUpView}>
      <Text>Bạn chưa có tài khoản? </Text>
      <TouchableOpacity style={styles.btnSignup} onPress={() =>{
        navigation.navigate('SignUp');
      }}>
          <Text style={styles.textSignup}>Đăng ký</Text>
        </TouchableOpacity>
    </View>
  </SafeAreaView>
  );
}
 
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
    height: '150@s',
    width: '150@s',
  },
  textLogo:{
    color: 'black',
    fontSize: 34,
    marginBottom: '30@s',
    fontWeight: '700'
  },
  inputView: {
    backgroundColor: Colors.INPUT_TEXT,
    borderRadius: '8@s',
    width: "80%",
    height: '45@s',
    // marginBottom: '20@s',
    borderColor: '#ccc',
    borderWidth: 0.8
  },
  forgotPassView: {
    // backgroundColor: 'red',
    width: '80%',
    paddingBottom: '20@s',
  },
  TextInput: {
    height: '50@s',
    flex: 1,
    padding: '10@s',
    marginHorizontal: '10@s',
    fontSize: 16,
    color: 'black',
  },
 
  forgot_button: {
    position: 'absolute',
    right: 0,
    color: Colors.PRIMARY_BUTTON,
    fontWeight: '700',
    fontSize: 14
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: '8@s',
    height: '50@s',
    alignItems: "center",
    justifyContent: "center",
    marginTop: '20@s',
    backgroundColor: Colors.PRIMARY_BUTTON,
    flexDirection: 'row'
  },
  loginText:{
    color: "#fff",
    fontSize: 20,
    fontWeight: '600',
    marginRight: '5@s'
  },
  loginWithView:{
    width: '80%',
    flexDirection: "row",
    justifyContent: 'space-evenly'
  },
  loginWithBtn:{
    backgroundColor: Colors.PRIMARY_BUTTON,
    width: "20%",
    marginTop: '20@s',
    height: '50@s',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: '8@s',
  },
  text:{
    marginTop: '30@s',
    color: Colors.GREY_TEXT,
    color: '#6b6b6b',
    // fontSize: 16,
    fontWeight: '500',
  },
  signUpView:{
    width: '100%',
    height: '40@s',
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0.8,
    borderTopColor: '#ccc',
    flexDirection: 'row',
  },
  textSignup:{
    color: Colors.PRIMARY_BUTTON,
    fontWeight: '700'
  },
  inputViewPass:{
    backgroundColor: Colors.INPUT_TEXT,
    borderRadius: '8@s',
    width: "80%",
    height: '45@s',
    marginTop: '20@s',
    borderColor: '#ccc',
    borderWidth: 0.8,
    flexDirection: 'row',
    alignItems: "center",
  },
  alertView:{
    // backgroundColor: 'red',
    width: '80%',
    paddingHorizontal: '10@s'
  },
  alertText:{
    color: 'red',
    fontSize: '12@ms0.3'
  }
});