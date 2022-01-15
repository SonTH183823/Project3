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
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid
} from "react-native";
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '@shared/Colors';
import { useNavigation } from '@react-navigation/native';

type StyledChatContentProps = {
  listMessage?: [];
  image?: string;
};

const blue = '#3777f0';
const grey = '#eee';


export default ChatContent = (props: StyledChatContentProps) =>{
    
    const navigation = useNavigation();
    const { listMessage } = props;
    // const [click, setClick] = useState(false);
    const showToastWithGravityAndOffset = () => {
      
    };
    const renderUser = ({item})=>{
      const isMe = item.id % 2 != 0;
      let isClick = false;
      return(
        <View style={styles.oneMesContainer}>
          {
            
            isClick ? (
            <View style={styles.timeMess}>
              <Text style={{color: Colors.GREY_TEXT, fontSize: 12}}>22:58</Text>
            </View>) : null
          }
          
          <View style={styles.avatarAndMes}>
            {
              isMe ? null : <Image style={styles.avaUser} resizeMode="cover" source={image} />
            }
            <TouchableOpacity
              onPress={() => {
                ToastAndroid.showWithGravity(
                  '22:58',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              }}
              activeOpacity={0.8}
              style={
                [styles.messageUserView, 
                { 
                  backgroundColor: !isMe ? grey : blue,
                  marginLeft: isMe ? 'auto' : scale(10)
                }]
            }>
              <Text style={[styles.messageUser, {color: isMe ? 'white' : 'black'}]}>{item.message}
                {'\n'}<Text style={{color: isMe ? 'white' : 'black', fontSize: 10}}>22:25</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {/* <FlatList
          data={dataTest}
          keyExtractor={item => item.id}
          renderItem={(item) => renderUser(item)}
          showsVerticalScrollIndicator={false}
          inverted={true}
        /> */}
      </View>
    );
};

const styles = ScaledSheet.create({
  container:{
    flex: 1,
  },
  oneMesContainer:{
    marginVertical: '5@s',
    // backgroundColor: 'red'
  },
  avaUser:{
    height: '35@s',
    width: '35@s',
    borderRadius: 50,
    borderColor: '#ccc',
    borderWidth: 0.8
  },
  nameAndMes:{
    flex: 1,
    paddingLeft: '10@s',
    justifyContent: 'center'
  },
  messageUserView:{
    maxWidth: '80%',
    borderRadius: 15,
  },
  messageUser:{
    color: Colors.GREY_TEXT,
    paddingVertical: '10@s',
    paddingHorizontal: '10@s',
    color: Colors.light.text,
    fontSize: '15@ms0.3'
  },
  avatarAndMes:{
    flexDirection: 'row',
    // backgroundColor: 'red'
  },
  timeMess:{
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10@s',
  },
  messageTime:{
    color: Colors.GREY_TEXT, 
    
  }
  
});