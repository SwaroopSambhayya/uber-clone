import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin } from '../slices/navSlice';
const data=[
    {
        id:"123",
        title:"Book a ride",
        image:"https://links.papareact.com/3pn",
        screen:"MapScreen",
    },
    {
        id:"456",
        title:"Order Food",
        image:"https://links.papareact.com/28w",
        screen:"EatScreen",
    }
]

const NavOptions = () => {
    const navigation=useNavigation();
    const origin=useSelector(selectOrigin);
    return (
        
            <FlatList
            horizontal
            data={data}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=><TouchableOpacity style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
            onPress={()=>navigation.navigate(item.screen)}
            disabled={!origin}
            
            >
                <View style={tw`${!origin && 'opacity-20'}`} >
                    <Image source={{uri:item.image}} style={{width:120,height:120,resizeMode:"contain"}} />
                    <Text style={tw `mt-2 text-lg font-semibold`}>{item.title}</Text>
                <Icon 
                
                style={tw `p-2 w-10 mt-4 bg-black rounded-full`}
                name="arrowright" color="white" type="antdesign" />
                </View>
            </TouchableOpacity>}
            />
        
    )
}

export default NavOptions

const styles = StyleSheet.create({})
