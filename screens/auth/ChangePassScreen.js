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
} from "react-native";
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '@shared/Colors';
import PrimaryInput from '@components/genaral/PrimaryInput';
import PrimaryInputPass from '@components/genaral/PrimaryInputPass';
import { isEmailValid } from '@shared/validateEmail';
import { auth } from '../../firebase';
import { updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export default function LoginScreen({ navigation }) {
    const [passAlert, setPassAlert] = useState("");
    const [passAlertAgain, setPassAlertAgain] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("123456");
    const [password, setPassword] = useState("123456");
    const [oldPass, setOldPass] = useState("");
    const [oldPassAlert, setOldPassAlert] = useState("");
    const user = auth.currentUser;

    const reauthenticate = (currentPassword) => {
        var cred = auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
      }
    
    const handlePress = async () => {
        if(oldPass != ''){
            reauthenticate(oldPass); 
        }
        // if(auth.currentUser.pass)
        // if( passwordAgain != '' && password != ''){
        //     if(password != passwordAgain){
        //         Alert.alert('Thông báo','Mật khẩu không khớp, hãy kiểm tra lại!');
        //     }else{
        //         createUserWithEmailAndPassword(auth, email, password )
        //         .then(authUser => {
        //             Alert.alert(
        //                 'Thông báo',
        //                 'Đăng ký thành công!',
        //                 [
        //                   { text: "Đăng nhập", onPress: () => {navigation.navigate('Login')}}
        //                 ]
        //             );                    
        //         })
        //         .catch(error => {
        //             Alert.alert('Thông báo','Có lỗi xảy ra, hãy kiểm tra lại!');
        //         });                            
        //     }
        // }else{
        //     Alert.alert('Thông báo','Có lỗi xảy ra, hãy kiểm tra lại!');
        // }
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

    const handleOldPassword = (pass) => {
        setOldPass(pass);
        if (pass.length < 6 && pass.length > 0) {
            setOldPassAlert('Mật khẩu phải có ít nhất 6 ký tự!');
        } else if (pass == '') {
            setOldPassAlert('Mật khẩu không được bỏ trống!');
        } else {
            setOldPassAlert('');
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
        <SafeAreaView style={{ width: '100%', flex: 1, backgroundColor: 'white' }}>
            <View style={styles.headerView}>
                <TouchableOpacity onPress={() =>{navigation.goBack();}}>
                    <Ionicons name='chevron-back-outline' size={28} color={Colors.light.text}/>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text style={styles.textLogo}>Đổi mật khẩu</Text>
                
                <PrimaryInputPass
                    alert={oldPassAlert}
                    onChangeText={(pass) => {
                        handleOldPassword(pass)
                    }}
                    placeholder={'Mật khẩu cũ'}
                />

                <PrimaryInputPass
                    alert={passAlert}
                    onChangeText={(pass) => {
                        handleChangePassword(pass)
                    }}
                    placeholder={'Mật khẩu mới'}
                />

                <PrimaryInputPass
                    alert={passAlertAgain}
                    onChangeText={(pass) => {
                        handleChangePasswordAgain(pass)
                    }}
                    placeholder={'Nhập lại mật khẩu mới'}
                />

                <TouchableOpacity style={styles.loginBtn} onPress={handlePress}>
                    <Text style={styles.loginText}>Cập nhật</Text>
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
        fontWeight: '600'
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
});