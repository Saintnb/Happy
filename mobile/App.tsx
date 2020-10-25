import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Mapview, {Marker, Callout} from 'react-native-maps';
import mapMarker from './src/images/map-marker.png';
import {useFonts} from 'expo-font';
import {Nunito_600SemiBold,Nunito_700Bold,Nunito_800ExtraBold} from '@expo-google-fonts/nunito';

import Routes from './src/routes';
export default function App() {
  const [fontsLoaded]=useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  });

  if(!fontsLoaded){
    return null;
  }
  return (
    <Routes/>
  );
}


