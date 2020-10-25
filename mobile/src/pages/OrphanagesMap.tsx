import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Mapview, {Marker, Callout} from 'react-native-maps';
import mapMarker from '../images/map-marker.png';
import {Feather} from '@expo/vector-icons';
import {Nunito_600SemiBold,Nunito_700Bold,Nunito_800ExtraBold} from '@expo-google-fonts/nunito';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '../services/api';

interface Orphange{
    id:number,
    latitude: number,
    longitude: number,
    name: string
}

export default function OrphanagesMap(){
    const [orphanages, setOrphanages]= useState<Orphange[]>([]);
    const navigation = useNavigation();

    useFocusEffect(()=>{
        api.get('orphanages').then(response=>{
             setOrphanages(response.data);
        });
    });

    function HandleNavigateToCreateOrphanage(){
        navigation.navigate('SelectMapPosition');

    };

    function handleNavigateToOrphanageDetails(id: number){
        navigation.navigate('OrphanageDetails', {id});
    }

    return (
        <View style={styles.container}>
      <Mapview style={styles.map} 
      initialRegion={{
      latitude:-34.687714,
      longitude:-58.3146596,
      latitudeDelta:0.008,
      longitudeDelta:0.008,
      }}
      >
        {orphanages.map(orphanage=>{
            return(
                <Marker
                    key={orphanage.id}
                    icon= {mapMarker}
                    calloutAnchor={{
                    x:2.7,
                    y:0.8,
                    }}
                    coordinate={{
                    latitude:orphanage.latitude,
                    longitude:orphanage.longitude,
                    }}
                >
                <Callout tooltip={true} onPress={()=>handleNavigateToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutcontainer}>
                <Text style={styles.callouttext}>{orphanage.name}</Text>
                </View>
                </Callout>
            </Marker>
            );
        })}

            
      </Mapview>

      <View style={styles.footer}>
          <Text style={styles.footerText}>{orphanages.length} soy el puto amo del universo</Text>
          <TouchableOpacity style={styles.createOrphanageButton} onPress={HandleNavigateToCreateOrphanage}>
            <Feather name='plus' size={20} color="#fff"/>
          </TouchableOpacity>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,    
    },
    map:{
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    calloutcontainer:{
      width:160,
      height:60,
      paddingHorizontal:16,
      backgroundColor:'rgba(255,255,255,0.8)',
      borderRadius:16,
      justifyContent:'center',
      elevation:3,
  
    },
    callouttext:{
      color:'#0089a5',
      fontSize:14,
      fontFamily:'Nunito_700Bold',
    },
    footer:{
      position:'absolute',
      left:24,
      right:24,
      bottom:32,
  
      backgroundColor:'#fff',
      borderRadius:20,
      height:56,
      paddingLeft:24,
  
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
  
      elevation:3,
    },
    footerText:{
      color:'#8fa7b3',
      fontFamily:'Nunito_700Bold',
    },
    createOrphanageButton:{
      width:56,
      height:56,
      backgroundColor:'#15c3d6',
      borderRadius:20,
  
      justifyContent:'center',
      alignItems:'center',
    }
  });