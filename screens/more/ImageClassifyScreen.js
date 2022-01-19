import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet, LogBox, Dimensions, Platform, Alert,
    Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator, Keyboard
} from 'react-native';
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as tf from '@tensorflow/tfjs';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';
import { Ionicons } from "@expo/vector-icons";
// import { pickImage, askForPermissionCam, askForPermissionMedia, getImage , uploadImage } from "@shared/utils";

const { width, height } = Dimensions.get('window');

const linkImage = [
    'https://images.pexels.com/photos/2194261/pexels-photo-2194261.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/1382728/pexels-photo-1382728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/461007/pexels-photo-461007.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Hotdog_-_Evan_Swigart.jpg/270px-Hotdog_-_Evan_Swigart.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Hotdog_-_Evan_Swigart.jpg/270px-Hotdog_-_Evan_Swigart.jpg'
]

export default ImageClassifyScreen = ({navigation}) => {
    const [uri, setUri] = useState('');
    const [resultText, setResultText] = useState('');
    const [model, setModel] = useState(null);
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const loadedModel = true;
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setValue('Loading TensorFlow...');
            await tf.ready();
            console.log(' Loading Model...');
            setValue('Loading MobileNet...');
            const model = await mobilenet.load();
            setModel(model);
            console.log('Done Loading Model');
            setIsLoading(false);
        })();
    }, [loadedModel])

    async function processImage(url) {
        Keyboard.dismiss();
        if(model != null) {
            if (url === '') {
                Alert.alert('Please chose image');
            } else {
                setValue('Loading...')
                setIsLoading(true);
                const response = await fetch(url, {}, { isBinary: true });
                console.log('Respone' + response);
                const imageData = await response.arrayBuffer();
                const imageData0 = new Uint8Array(imageData);
                // Decode image data to a tensor
                const imageTensor = decodeJpeg(imageData0);
                const predictions = await model.classify(imageTensor);
                console.log('Predictions: ' + predictions);
                setResultText(predictions[0]);
                setIsLoading(false);
            }
        }    
    }

    const handleImage1 = () => {
        setUri(linkImage[4]);
        setResultText('');
    }

    const handleImage2 = () => {
        setUri(linkImage[1]);
        setResultText('');
    }

    const handleImage3 = () => {
        setUri(linkImage[0]);
        setResultText('');
    }

    const handleImage4 = () => {
        setUri(linkImage[3]);
        setResultText('');
    }

    return (
        <View style={{ backgroundColor: '#fff', flex: 1, marginTop: 20 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <View style={styles.headerView}>
                <Ionicons name='chevron-back-outline' size={30} color='black' style={styles.iconBack} onPress={()=>{
                    navigation.goBack();
                }}/>
                <Text style={{ fontSize: 20, marginVertical: 10}}>Chose Image...</Text>
            </View>
                <View style={styles.buttonImageView}>
                    <TouchableOpacity style={styles.buttonImage} onPress={handleImage1}>
                        <Text style={styles.buttonText}>Image 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonImage} onPress={handleImage2}>
                        <Text style={styles.buttonText}>Image 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonImage} onPress={handleImage3}>
                        <Text style={styles.buttonText}>Image 3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonImage} onPress={handleImage4}>
                        <Text style={styles.buttonText}>Image 4</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.buttonImageView}>
                    <TouchableOpacity style={[styles.buttonImage, {width: '40%', backgroundColor: '#4d4dff'}]} onPress={handleGetPicture}>
                        <Text style={styles.buttonText}>Open Library</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonImage, {width: '40%', backgroundColor: '#4d4dff'}]} onPress={handleProfilePicture}>
                        <Text style={styles.buttonText}>Open Camera</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
            <View style={styles.buttonImageView}>
                <TextInput style={styles.textInput}
                    placeholder={'Or enter the URL of the image here...'}
                    placeholderTextColor={'#aaa'}
                    onChangeText={setUri}
                    value={uri}
                />
                <TouchableOpacity style={styles.buttonLoadImage} onPress={() => {
                    setUri('');
                    setResultText('')
                }}>
                    <Text style={styles.buttonText}>Clear</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageView}>
                {uri == '' ? <Ionicons name={'image'} color={'#ccc'} size={100} /> :
                    <Image
                        style={styles.logo}
                        source={{
                            uri: uri,
                        }}
                    />
                }
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                <TouchableOpacity style={styles.processImage} onPress={() => processImage(uri)}>
                    <Text style={styles.buttonText}>Classify Image</Text>
                </TouchableOpacity>
                {isLoading ?
                    (<View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginRight: 5 }}>{value}</Text>
                        <ActivityIndicator size="small" color="#000" />
                    </View>) : (
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', justifyContent: 'center' }}>
                            <View style={styles.resultView}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Prediction</Text>
                                <Text style={{ color: 'green', fontWeight: 'bold', marginTop: 10, fontSize: 18 }}>{resultText.className}</Text>
                            </View>
                            <View style={styles.resultView}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Probability</Text>
                                <Text style={{ fontSize: 18, color: 'red', marginTop: 10 }}>{resultText.probability}</Text>
                            </View>
                        </View>
                    )

                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    buttonImageView: {
        width: width,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        // backgroundColor: 'red',
        paddingBottom: 20,
        borderColor: '#ccc',
        borderBottomWidth: 0.5
    },
    resultView: {
        alignItems: 'center', width: '60%', borderColor: '#ccc', height: 140,
        borderWidth: 0.5,
        padding: 10
    },
    buttonImage: {
        backgroundColor: 'green',
        height: 50,
        width: 80,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 14
    },
    textInput: {
        height: 40,
        width: width - 100,
        // backgroundColor: 'red',
        marginTop: 20,
        borderRadius: 8,
        borderColor: '#bbb',
        borderWidth: 0.5,
        paddingLeft: 10
    },
    buttonLoadImage: {
        height: 40,
        width: 70,
        backgroundColor: 'green',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    imageView: {
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: 200,
        borderRadius: 8,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    },
    logo: {
        width: width - 20,
        height: (width - 20) * 0.5625,
        resizeMode: 'cover',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#ccc',
        paddingVertical: 10
    },
    processImage: {
        height: 40,
        width: 160,
        backgroundColor: '#4d4dff',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    headerView:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center'
    },
    iconBack:{
        position: 'absolute',
        left: 0,
    }
});