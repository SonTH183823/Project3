import React, { useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ListChat from "@components/ListChat";
import Colors from '@constants/Colors';
import ContentSearch from '@components/ContentSearch';

const {width, height} = Dimensions.get('window');

const SearchScreen = ({navigation})=> {
    const textInputRef = useRef();
    const focusOnInput = () => {
        textInputRef.current.focus();
      };
    navigation.addListener('focus', focusOnInput);
    const[valueSearch, setValueSearch] = useState('');
    return(
      <View style={styles.container}>
        <View style={styles.headerView}>
            <View style={styles.searchBar}>
                <Ionicons name='search-outline' size={20} color={Colors.GREY_TEXT} style={{marginLeft: 10, marginRight: 5}}/>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Tìm kiếm"
                    placeholderTextColor={Colors.GREY_TEXT}
                    ref={textInputRef}
                    value={valueSearch}
                    onChangeText={setValueSearch}
                />
                {valueSearch.length != 0 ? 
                    (<TouchableOpacity onPress={() =>{
                        setValueSearch('');
                    }}>
                        <Ionicons name='close-circle' size={22} color={Colors.GREY_TEXT} style={{marginLeft: 10, marginRight: 5}}/>
                    </TouchableOpacity>) : null
                }
            </View>
            <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() =>{
                    navigation.goBack();
                }}>
                <Text style={styles.canceltext}>Huỷ</Text>
            </TouchableOpacity>
        </View> 
        <View style={styles.listChatView}>
          <ContentSearch />
        </View>
      </View>
    )
}

const styles = ScaledSheet.create({
  container:{
    width: '100%',
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingTop: '25@s',
    paddingHorizontal: '15@s',
    // backgroundColor: 'green'
  },
  headerView:{
    width: '100%',
    height: '40@s',
    marginBottom: '10@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
    // backgroundColor: 'red'
  },
  searchBar:{
    backgroundColor: '#efefef',
    borderRadius: '8@s',
    flex: 1,
    height: '40@s',
    borderColor: '#ccc',
    borderWidth: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE
  },
  TextInput: {
    height: '100%',
    alignItems: 'center',
    color: 'black',
    flex: 1,
    fontSize: '16@ms0.3',
  },
  listChatView:{
    // backgroundColor: 'red',
    width: "100%",
    // paddingTop: '10@s',
    flex: 1,
    // borderColor: '#ccc',
    // borderTopWidth: 0.8
  },
  cancelBtn:{
      width: "10%",
      marginLeft: '10@s'
  },
  canceltext:{
      color: Colors.PRIMARY_BUTTON,
      fontSize: '16@ms0.3',
      fontWeight: '500'
  }
});
export default SearchScreen;