import React, {useState } from 'react';
import { 
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    Platform,
    TouchableOpacity
} from 'react-native';
import Colors from '@shared/Colors';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

interface StyleInputMess {
    onSend?: () => void;
    onChangeMes?: () => void;
}

const InputMessage = (props: StyleInputMess) => {
    const { onSend } = props;
    const[message, setMessage] = useState('');
    return (
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios' ? "padding": "height"}
                keyboardVerticalOffset={scale(130)}
            >
                <View style={styles.bottomChatView}>
                    <TouchableOpacity style={styles.stickerBtn}>
                        <Ionicons name='happy-outline' size={32} color={'black'}/>
                    </TouchableOpacity>
                    
                    <TextInput placeholder="Aa" style={styles.chatInput} onChangeText={(message) =>{
                        setMessage(message);
                        onChangeMes();
                        }}/>
                    {message == '' ? 
                    (
                    <View style={styles.iconMore}>
                        <TouchableOpacity style={styles.stickerBtn2}>
                            <Ionicons name='mic-outline' size={32} color={'black'}/>
                        </TouchableOpacity>     
                        <TouchableOpacity style={[styles.stickerBtn2,{marginRight: 5 }]}>
                            <Ionicons name='camera-outline' size={34} color={'black'}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.stickerBtn2}>
                            <Ionicons name='image-outline' size={32} color={'black'}/>
                        </TouchableOpacity>
                    </View>
                    ) : (
                    <TouchableOpacity style={styles.sendBtn} onPress={onSend}>
                        <Text style={styles.sendText}>Gửi</Text>
                    </TouchableOpacity>
                    )}
                    
                </View>
            </KeyboardAvoidingView>
    )
}

export default InputMessage;

const styles = ScaledSheet.create({
    container:{
        width: '100%',
        height: '50@s',
        // backgroundColor: 'red',
        paddingHorizontal: '10@s',
        // borderRadius: 50
    },
    bottomChatView:{
        marginTop: '5@s',
        height: '40@s',
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 50,
        borderWidth: 0.8,
        borderColor: '#ccc',
        justifyContent: 'center',
        paddingHorizontal: '7@s'
    },
    chatInput:{
      height: '100%',
      flex:1,
      paddingLeft: '10@s',
      fontSize: '16@ms0.3',

    },
    keyboardView:{
      // backgroundColor: 'yellow',
    },
    stickerBtn:{
        width: '35@s',
        height: '35@s',
        // backgroundColor: Colors.PRIMARY_BUTTON,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        
        borderWidth: 0.8,
        borderColor: '#fff'
        // marginLeft: '40@s'
    },
    stickerBtn2:{
        width: '35@s',
        height: '35@s',
        // backgroundColor: Colors.PRIMARY_BUTTON,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        
        borderWidth: 0.8,
        borderColor: '#fff'
    },
    iconMore:{
        flexDirection: 'row',
    },
    sendBtn:{
        marginHorizontal: '10@s',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendText:{
        fontSize: '18@ms0.3',
        fontWeight: '700',
        color: Colors.PRIMARY_COLOR
    },
});
