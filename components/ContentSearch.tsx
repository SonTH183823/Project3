import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Alert
} from "react-native";
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ListChat from "@components/ListChat";
import Colors from '@constants/Colors';
import { dataTest } from '@assets/dataTest';

const {width, height} = Dimensions.get('window');

const ContentSearch = ({navigation})=> {
    const [resultSearch, setResultSearch] = useState([]);
    const [isSearch, setIsSearch] = useState(1);
    useEffect(() => {
        setResultSearch(dataTest);
    }, []);

    const contentView = () => {
        if (isSearch == 2) {
          return (
            <View style={styles.loaderStyle}>
              <ActivityIndicator size="small" color="#aaa" />
            </View>
          );
        }
        if (isSearch == 3) {
          return (
            <View style={styles.contentViewEmpty}>
              <Image style={{ height: 180, width: 180 }} source={require('@assets/images/emptyProduct.png')} />
              <Text>Không tìm thấy kết quả nào!!!</Text>
            </View>
          );
        }
        return (
          <View style={styles.listChatView}>
            <FlatList
                data={resultSearch}
                keyExtractor={item => item.id}
                renderItem={(item) => renderUser(item)}
                showsVerticalScrollIndicator={false}
            />
          </View>
        );
    };

    const renderUser = ({item})=>{
        return(
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.oneUserContainer}
                onPress={() => {
                    // navigation.push('ProductDetailsScreen', { item });
                    Alert.alert('clicked' + item.id);
                }}>
                <View style={styles.contentOneView}>
                    <Image
                        style={styles.avaUser}
                        resizeMode="cover"
                        source={item.image}
                    />
                    <View style={styles.nameView}>
                        <Text style={styles.nameUser} numberOfLines={1}>{item.name}</Text>
                    </View>
                </View>
                
            </TouchableOpacity>
        )
    };
    return(
        <View style={{flex: 1}}>
          {contentView()}
        </View>
    )
}

const styles = ScaledSheet.create({
  
  listChatView:{
    width: "100%",
    flex: 1,
    borderColor: '#ccc',
    borderTopWidth: 0.8,
    // backgroundColor: 'red'
  },
  contentOneView:{
    width: '100%',
    marginTop: '10@s',
    height: '50@s',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: Colors.PRIMARY_BUTTON
  },
  contentViewEmpty: {
    flex: 1,
    alignItems: 'center',
    marginTop: '50@s'
  },
  avaUser:{
    height: '40@s',
    width: '40@s',
    borderRadius: 50,
    borderWidth: 0.8,
    borderColor: '#ccc'
  },
  nameView:{
    //   backgroundColor: 'red',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
    borderBottomWidth: 0.8,
    borderBottomColor: '#eee',
    paddingLeft: '10@s',
    marginLeft: '10@s',
  },
  nameUser:{
      color: 'black',
      fontSize: '18@ms0.3',
      fontWeight: '600'
  }
});
export default ContentSearch;