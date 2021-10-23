import { useNavigation } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import Map from '../components/Map';
import NavigateCard from '../components/NavigateCard';
import RideOptions from '../components/RideOptions';

const MapScreen = () => {
    const Stack=createNativeStackNavigator();
    const nav=useNavigation();
    return (
        <SafeAreaView>
            <TouchableOpacity style={tw`absolute top-16 left-5 z-50 p-3 rounded-full shadow-lg bg-gray-100`}
            onPress={()=>nav.goBack()}
            >

        <Icon
            name="menu"
            
        />
            </TouchableOpacity>
        <View style={tw`h-1/2`}>
        <Map/>
        </View>
        <View style={tw`h-1/2`}>
            <Stack.Navigator >
                <Stack.Screen name="NavigateCard" component={NavigateCard} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name="RideOptions" component={RideOptions}  options={{headerShown:false,gestureEnabled:true,}}></Stack.Screen>
            </Stack.Navigator>
         
         </View>
        </SafeAreaView>
    )
}

export default MapScreen;

const styles = StyleSheet.create({})
