import React, { useState, useEffect } from 'react';

import { Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

import { MaterialIcons } from '@expo/vector-icons';
import styles from '../Styles/MainStyles';

import api from '../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';

function Main({ navigation }){

    const [ currentRegion, setCurrentRegion ] = useState(null);
    const [ devs, setDevs ] = useState([]);
    const [ techs, setTechs ] = useState('');

    useEffect(() => {
        subscribeToNewDevs(dev => setDevs([...devs, dev]));
    }, [devs]);
    
    useEffect(() => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync()

            if(granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;               

                setCurrentRegion({
                    latitude,
                    longitude,                    
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }
        loadInitialPosition();
    }, []);

    function setUpWebsocket(){

        disconnect();

        const { latitude, longitude } = currentRegion;

        connect(
            latitude,
            longitude,
            techs,
        );
    }

    async function loadDevs(){
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs,
            }
        });

        setDevs(response.data.devs);
        setUpWebsocket();

    }

    function handleRegionChanged(region){
        setCurrentRegion(region);
    }

    if(!currentRegion){
        return null;
    }

    return(
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>

                {
                    devs.map(dev => (
                        <Marker 
                        key={dev._id}
                        coordinate={{ 
                            latitude: dev.location.coordinates[1],
                            longitude: dev.location.coordinates[0] 
                            }}>
                    
                            <Image style={styles.avatar} source={{uri: dev.avatar_url}}/>

                            <Callout onPress={
                                () => {
                                    navigation.navigate('Profile', { github_username: dev.github_username })
                                }
                            }>
                                <View style={styles.callout}>
                                    <Text style={styles.name} >{dev.name}</Text>
                                    <Text style={styles.bio}>{dev.bio}</Text>
                                    <Text style={styles.techs}>{dev.techs.join(', ')}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    ))
                }
            </MapView>
            <View  style={styles.searchForm}>
                <TextInput 
                style={styles.searchInput} 
                placeholder="Buscar devs por tecnologias..."
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={true}
                value={techs}
                onChangeText={setTechs}
                />

                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </>
    )
    
}
export default Main;