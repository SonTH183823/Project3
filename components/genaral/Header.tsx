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
  FlatList
} from "react-native";
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '@constants/Colors';
import { dataTest } from '@assets/dataTest';
import { useNavigation } from '@react-navigation/native';