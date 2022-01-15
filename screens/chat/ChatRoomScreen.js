import React, { useState, useEffect, useCallback} from "react";
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
  Platform,
  ActivityIndicator
} from "react-native";
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '@shared/Colors';
import { useNavigation } from '@react-navigation/native';
import PrimaryInput from '@components/genaral/PrimaryInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ChatContent from "@screens/chat/ChatContent";
import InputMessage from "@screens/chat/InputMessage";
import { pickImage, getImage , uploadImage } from "@shared/utils";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { auth, db } from "../../firebase";
import { useRoute } from "@react-navigation/native";
import {
  Actions,
  Bubble,
  GiftedChat,
  InputToolbar,
} from "react-native-gifted-chat";
import ImageView from "react-native-image-viewing";

const {width, height} = Dimensions.get('window');
const default_avatar = 'https://www.teenwiseseattle.com/wp-content/uploads/2017/04/default_avatar.png';

const ChatRoomScreen = ()=> {
    const [roomHash, setRoomHash] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImageView, setSeletedImageView] = useState("");
    const route = useRoute();
    const userB = route.params.data.userB;
    const roomId = route.params.data.roomId;
    const hasRoom = route.params.data.hasRoom;
    // console.log(roomId);
    const { currentUser } = auth;
    const senderUser = {
      name: currentUser.displayName,
      _id: currentUser.uid,
      avatar: currentUser.photoURL,
    };
    const roomRef = doc(db, "rooms", roomId);
    const roomMessagesRef = collection(db, "rooms", roomId, "messages");  

    // console.log(data);
    const navigation = useNavigation();
    const[messages, setMessages] = useState([]);


    useEffect(() => {
      (async () => {
        if (!hasRoom) {
          const currUserData = {
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL
          };
          const userBData = {
            displayName: userB.displayName,
            email: userB.email,
            photoURL: userB.photoURL
          };
          const roomData = {
            participants: [currUserData, userBData],
            participantsArray: [currentUser.email, userB.email],
          };
          try {
            await setDoc(roomRef, roomData);
          } catch (error) {
            console.log(error);
          }
        }
        const emailHash = `${currentUser.email}:${userB.email}`;
        setRoomHash(emailHash);
        // if (selectedImage && selectedImage.uri) {
        //   await sendImage(selectedImage.uri, emailHash);
        // }
      })();
    }, []);

    useEffect(() => {
      const unsubscribe = onSnapshot(roomMessagesRef, (querySnapshot) => {
        const messagesFirestore = querySnapshot
          .docChanges()
          .filter(({ type }) => type === "added")
          .map(({ doc }) => {
            const message = doc.data();
            return { ...message, createdAt: message.createdAt.toDate() };
          })
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        appendMessages(messagesFirestore);
      });
      return () => unsubscribe();
    }, []);

    const appendMessages = useCallback(
      (messages) => {
        // console.log(messages);
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, messages)
        );
      },
      [messages]
    );

    async function onSend(messages = []) {
      const writes = messages.map((m) =>{
        addDoc(roomMessagesRef, m)
      });
      const lastMessage = messages[messages.length - 1];
      writes.push(updateDoc(roomRef, { lastMessage }));
      await Promise.all(writes);
    }

    async function sendImage(uri, roomPath) {
      const { url, fileName } = await uploadImage(
        uri,
        `images/rooms/${roomPath || roomHash}`
      );
      const message = {
        _id: fileName,
        text: "",
        createdAt: new Date(),
        user: senderUser,
        image: url,
      };
      const lastMessage = { ...message, text: "Image" };
      await Promise.all([
        addDoc(roomMessagesRef, message),
        updateDoc(roomRef, { lastMessage }),
      ]);
    }
  
    async function handlePhotoPicker() {
      const result = await pickImage();
      if (!result.cancelled) {
        await sendImage(result.uri);
      }
    }

    async function handleGetPhotoLibrary() {
      const result = await getImage();
      if (!result.cancelled) {
        await sendImage(result.uri);
      }
    }
  

    const detailsInfor = ()=>{
      navigation.navigate('MyInfor', {name: userB.displayName, image: userB.photoURL, email: userB.email, isMe: false});
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerView}>
                <TouchableOpacity style={styles.searchBtn} onPress={() =>{navigation.navigate('Home');}}>
                    <Ionicons name='chevron-back-outline' size={28} color={Colors.light.text}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={detailsInfor} activeOpacity={0.7}>
                  <Image
                    style={styles.avaUser}
                    resizeMode="cover"
                    source={{uri: userB.photoURL|| default_avatar}}
                    />
                  </TouchableOpacity>
                  <Text style={styles.fullNameText} numberOfLines={1} onPress={detailsInfor}>{userB.displayName}</Text>
                <View style={styles.iconHeader}>
                    <TouchableOpacity style={styles.searchBtn} onPress={handleGetPhotoLibrary}>
                      <Ionicons name='image' size={29} color={Colors.light.text} style={{marginLeft: 10}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.searchBtn} onPress={handlePhotoPicker}>
                      <Ionicons name='camera' size={32} color={Colors.light.text} style={{marginLeft: 10}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.searchBtn} onPress={detailsInfor}>
                      <Ionicons name='alert-circle' size={30} color={Colors.light.text} style={{marginLeft: 10}}/>
                    </TouchableOpacity>          
                </View>
            </View>
            <View style={styles.contentChatView}>

              <GiftedChat
                onSend={onSend}
                placeholder={'Aa'}
                messages={messages}
                isLoadingEarlier={true}
                user={senderUser}
                renderLoadEarlier={()=>{
                  return <ActivityIndicator size="large"color={Colors.GREY_TEXT} />
                }}
                timeTextStyle={{ 
                  right: { color: 'white' },
                  left: { color: Colors.GREY_TEXT }
                }}
                renderSend={(props) => {
                  const { text, messageIdGenerator, user, onSend } = props;
                  const idMes = messageIdGenerator();
                  return (
                    <TouchableOpacity
                      style={styles.sendBtn}
                      onPress={() => {
                        if (text && onSend) {
                          onSend(
                            {
                              text: text.trim(),
                              user,
                              _id: idMes,
                            },
                            true
                          );
                        }
                      }}
                    >
                      <Text style={styles.sendText}>Gửi</Text>
                    </TouchableOpacity>
                  );
                }}
                renderActions={(props) => (
                  <Actions
                    {...props}
                    containerStyle={styles.iconStyle}
                    onPressActionButton={()=>{}}
                    icon={() => (
                      <Ionicons name="happy-outline" size={34} color={'black'} />
                    )}
                  />
                )}
                renderInputToolbar={(props) => (
                  <InputToolbar
                    {...props}
                    containerStyle={styles.bottomChatView}
                  />
                )}
                
                renderBubble={(props) => (
                  <Bubble
                    {...props}
                    textStyle={{ 
                      right: { color: 'white' },
                      left: { color: 'black' }
                    }}
                    wrapperStyle={{
                      left: {
                        backgroundColor: '#eee',
                        marginBottom: 10
                      },
                      right: {
                        backgroundColor: '#3777f0',
                        marginBottom: 10
                      },
                    }}
                  />
                )}
                renderMessageImage={(props) => {
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(true);
                          setSeletedImageView(props.currentMessage.image);
                        }}
                      >
                        <Image
                          resizeMode="contain"
                          style={styles.imageChat}
                          source={{ uri: props.currentMessage.image }}
                        />
                         {selectedImageView ? (
                           <ImageView
                             imageIndex={0}
                             visible={modalVisible}
                             onRequestClose={() => setModalVisible(false)}
                             images={[{ uri: selectedImageView }]}
                           />
                         ) : null}
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
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
      height: '60@s',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: '10@s',
      justifyContent: 'space-between',
      paddingHorizontal: '10@s',
      // backgroundColor: 'green',
      borderBottomWidth: 0.8,
      borderBottomColor: '#ccc'
    },
    avaUser:{
        height: '40@s',
        width: '40@s',
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
      fontSize: 24,
      flex: 1,
    },
    contentChatView:{
        width: '100%',
        flex: 1,
    },
    listChatView:{
      width: "100%",
      paddingHorizontal: '10@s',
      flex: 1,
      borderTopColor: '#ccc',
      borderTopWidth: 0.8,
    },
    containerInput:{
      width: '100%',
      height: '50@s',
      paddingHorizontal: '10@s',
      paddingBottom: '5@s',
  },
  bottomChatView:{
      marginBottom: '5@s',
      height: '40@s',
      width: '99%',
      marginHorizontal: '2@s',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 45,
      borderWidth: 0.8,
      borderColor: '#ccc',
      justifyContent: 'center',
      paddingLeft: '30@s'
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
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.8,
      borderColor: '#fff'
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
      paddingHorizontal: '10@s',
      height: '100%',
      width: '50@s',
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'red'
  },
  sendText:{
      fontSize: '18@ms0.3',
      fontWeight: '700',
      color: Colors.PRIMARY_COLOR
  },
  imageChat:{
    width: '200@s',
    height: '150@s',
    padding: 6,
    borderRadius: 15,
    resizeMode: "cover",
  },
  iconStyle:{
    position: "absolute",
    left: '-40@s',
    // bottom: 0,
    width: '40@s',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
      // zIndex: 9999,
    
  }
});

export default ChatRoomScreen;