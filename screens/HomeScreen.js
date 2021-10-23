import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavorites from '../components/NavFavorites';
const HomeScreen = () => {
        const dispatch=useDispatch();
    return (
        <SafeAreaView style={tw `bg-white h-full`}>
        <View style={tw `p-5`} >
            <Image 
            style={{width:100,height:100,resizeMode:"contain"}}
            source={{uri:"https://links.papareact.com/gzs"}}/>
            <GooglePlacesAutocomplete 
            placeholder="Where From?"
            minLength={2}
            enablePoweredByContainer={false}
            returnKeyType={"search"}
            autoFocus={false}

            onPress={(data,details)=>{
                dispatch(setOrigin({
                    location:details.geometry.location,
                    description:data.description
                }));
                dispatch(setDestination(null));
            }}
            returnKeyType={'default'}
            fetchDetails={true}
            styles={{
                container:{
                    flex:0
                },
                textInput:{
                    fontSize:18
                }
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            query={{
                key:GOOGLE_MAPS_APIKEY,
                language:"en"
            }}
            />
        <NavOptions/>
        <NavFavorites/>
        </View>
       
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
