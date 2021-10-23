import React from 'react'
import { StyleSheet, Text, View,SafeAreaView, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_APIKEY} from "@env";
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/core';
import NavFavorites from './NavFavorites';
import { Icon } from 'react-native-elements';
const NavigateCard = () => {
    const dispatch=useDispatch(setDestination);
    const nav=useNavigation()
    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good Morning, Swaroop</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                    placeholder="Where to?"
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    minLength={2}
                    enablePoweredByContainer={false}
                    onPress={(data,details)=>{
                            dispatch(setDestination({
                                location:details.geometry.location,
                                description:data.description
                            }));
                            nav.navigate("RideOptions");
                            
                    }}
                    styles={toInputbox}
                    query={{
                        key:GOOGLE_MAPS_APIKEY,
                        language:"en"
                    }}
                    />
                </View>
                <NavFavorites/>
            </View>
            <View style={tw` flex-row mt-auto justify-evenly bg-white  border-t border-gray-200`}>
            <TouchableOpacity style={tw`flex flex-row px-4 py-3  justify-between rounded-full w-24 m-4 bg-black`}
            onPress={()=>nav.navigate("RideOptions")}
            >
                <Icon name="car" type="font-awesome" color="white" size={16} />
                <Text style={tw`text-center text-white`} >Rides</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`flex flex-row px-4 py-3 m-4 justify-between rounded-full w-24 `} >
                <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                <Text>Eats</Text>
            </TouchableOpacity>
</View>
        </SafeAreaView>
    )
}

export default NavigateCard

const toInputbox = StyleSheet.create({
    container:{
        backgroundColor:"white",
        paddingTop:20,
        flex:0
    },
    textInput:{
        backgroundColor:"#DDDDDF",
        borderRadius:0,
        fontSize:18
    },
    textInputContainer:{
        paddingHorizontal:20,
        paddingBottom:0
    }
})
