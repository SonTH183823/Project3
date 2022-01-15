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
    Keyboard,
    ActivityIndicator
} from "react-native";
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '@shared/Colors';
import PrimaryInput from '@components/genaral/PrimaryInput';
import PrimaryInputPass from '@components/genaral/PrimaryInputPass';
import { isEmailValid } from '@shared/validateEmail';
import { auth } from '../../firebase';
import { updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("abc@gmail.com");
    const [passAlert, setPassAlert] = useState("");
    const [passAlertAgain, setPassAlertAgain] = useState("");
    const [emailAlert, setEmailAlert] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("123456");
    const [password, setPassword] = useState("123456");
    const [isProcess, setIsProcess] = useState(true);

    const checkEmail = () => {
        if (email == '') {
            setEmailAlert('Email không được bỏ trống!');
        } else {
            if (!isEmailValid(email)) {
                setEmailAlert('Email không đúng định dạng!');
            } else {
                setEmailAlert('');
            }
        }
    }
    const handleSignUpPress = async () => {
        Keyboard.dismiss();
        setIsProcess(false);
        if(emailAlert == '' && passwordAgain != '' && password != ''){
            if(passAlert != ''){
                Alert.alert('Thông báo','Mật khẩu không hợp lệ!');
                setIsProcess(true);
            }else if(password != passwordAgain){
                Alert.alert('Thông báo','Mật khẩu không khớp, hãy kiểm tra lại!');
                setIsProcess(true);
            } else{
                createUserWithEmailAndPassword(auth, email, password )
                .then(authUser => {
                    Alert.alert(
                        'Thông báo',
                        'Đăng ký thành công!',
                        [
                          { text: "Đăng nhập", onPress: () => {navigation.navigate('Login')}}
                        ]
                    ); 
                    setIsProcess(true);
                })
                .catch(error => {
                    Alert.alert('Thông báo','Có lỗi xảy ra, hãy kiểm tra lại!');
                    setIsProcess(true);
                });                            
            }
        }else{
            Alert.alert('Thông báo','Có lỗi xảy ra, hãy kiểm tra lại!');
            setIsProcess(true);
            checkEmail();
        }
    }

    const handleChangePassword = (pass) => {
        setPassword(pass);
        if (pass.length < 6 && pass.length > 0) {
            setPassAlert('Mật khẩu phải có ít nhất 6 ký tự!');
        } else if (pass == '') {
            setPassAlert('Mật khẩu không được bỏ trống!');
        } else {
            setPassAlert('');
        }
    }

    const handleChangePasswordAgain = (pass) => {
        setPasswordAgain(pass);
        if (pass.length < 6 && pass.length > 0) {
            setPassAlertAgain('Mật khẩu phải có ít nhất 6 ký tự!');
        } else if (pass == '') {
            setPassAlertAgain('Mật khẩu không được bỏ trống!');
        } else {
            setPassAlertAgain('');
        }
    }
    
    return (
        <SafeAreaView style={{ width: '100%', flex: 1 }}>
            <View style={styles.container}>
                {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}
                <Text style={styles.textLogo}>Tạo tài khoản</Text>
                
                <PrimaryInput
                    alert={emailAlert}
                    onChangeText={(email) => {
                        setEmailAlert('');
                        setEmail(email);
                    }}
                    placeholder={'Email'}
                    onBlurHandle={checkEmail}
                />

                <PrimaryInputPass
                    alert={passAlert}
                    onChangeText={(pass) => {
                        handleChangePassword(pass)
                    }}
                    placeholder={'Mật khẩu'}
                />

                <PrimaryInputPass
                    alert={passAlertAgain}
                    onChangeText={(pass) => {
                        handleChangePasswordAgain(pass)
                    }}
                    placeholder={'Nhập lại mật khẩu'}
                />

                <TouchableOpacity style={styles.loginBtn} onPress={handleSignUpPress}>
                    <Text style={styles.loginText}>Đăng ký</Text>
                    {!isProcess ? <ActivityIndicator size="small" color="#fff" /> : null}
                </TouchableOpacity>

            </View>
            <View style={styles.signUpView}>
                <Text>Bạn đã có tài khoản? </Text>
                <TouchableOpacity style={styles.btnSignup} onPress={() =>{
                    navigation.navigate('Login');
                }}>
                    <Text style={styles.textSignup}>Đăng nhập</Text>
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
    },
    textLogo: {
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
        backgroundColor: 'red',
        width: '80%',
        marginBottom: '20@s',
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
        fontWeight: '600',
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
    loginText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: '600',
        marginRight: '5@s'
    },
    loginWithView: {
        width: '80%',
        flexDirection: "row",
        justifyContent: 'space-evenly'
    },
    loginWithBtn: {
        backgroundColor: Colors.PRIMARY_BUTTON,
        width: "20%",
        marginTop: '20@s',
        height: '50@s',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: '8@s',
    },
    text: {
        marginTop: '30@s',
        color: Colors.GREY_TEXT,
        color: '#6b6b6b',
        // fontSize: 16,
        fontWeight: '500',
    },
    signUpView: {
        width: '100%',
        height: '40@s',
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 0.8,
        borderTopColor: '#ccc',
        flexDirection: 'row',
    },
    textSignup: {
        color: Colors.PRIMARY_BUTTON,
        fontWeight: '700'
    },
    inputViewPass: {
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
    alertView: {
        // backgroundColor: 'red',
        width: '80%',
        paddingHorizontal: '10@s'
    },
    alertText: {
        color: 'red',
        fontSize: '12@ms0.3'
    },
    nameView:{
        width: '100%',
        marginBottom: '20@s'
    }
});