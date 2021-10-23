import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, View,SafeAreaView, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { selectTravelTimeInformation } from '../slices/navSlice'
const RideOptions = () => {
    const nav=useNavigation();
    const [selected,setSelected]=useState(null);
    const travelTimeInformation=useSelector(selectTravelTimeInformation);
    const SURG_CHARGE_RATE=1.5;
    const data=[
        {
            id:"Uber-X-123",
            title:"UberX",
            multiplier:1,
            image:"https://links.papareact.com/3pn"

        },
        {
            id:"Uber-Xl-456",
            title:"Uber XL",
            multiplier:1.25,
            image:"https://links.papareact.com/5w8"

        },{
            id:"Uber-LUX-789",
            title:"Uber LUX",
            multiplier:1.75,
            image:"https://links.papareact.com/7pf"

        }
    ]
    return (
        <SafeAreaView style={tw`flex-grow bg-white`} >
            
        <View>
            <TouchableOpacity onPress={()=>nav.navigate("NavigateCard")}   style={tw`absolute top-2 left-3 p-1 z-50 rounded-full`}>
            <Icon   name="chevron-left"  type="fontawesome" />
            </TouchableOpacity>
            <Text style={tw`text-center mt-3 mb-5 text-xl`}>Select Ride - {travelTimeInformation?.distance?.text}</Text>
        </View>
        <FlatList
        data={data}
        keyExtractor={(item)=>item.id}
        
        renderItem={({item})=>(
            <TouchableOpacity style={tw`flex-row items-center justify-between px-8 ${item.id==selected?.id && 'bg-gray-200'} `} 
            onPress={()=>setSelected(item)}
            >
                <Image
              style={{
                  width:90,
                  height:90
              }}
                resizeMode="contain"
                source={{uri:item.image}}
                />
                <View >
                    <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
                    <Text>{travelTimeInformation?.duration?.text+" journey"}</Text>
                </View>
                <Text style={tw`text-xl`} >

                {new Intl.NumberFormat('en-IN',{
                    style:'currency',
                    currency:'INR'
                 }).format(
                    (travelTimeInformation?.duration?.value*SURG_CHARGE_RATE*item.multiplier)/20 
                )}


                </Text>
            </TouchableOpacity>
        )}
        />
        
        <TouchableOpacity style={tw`absolute bottom-0 left-0 right-0 z-50 p-3 bg-black mx-4 items-center ${!selected && 'bg-gray-200'}`} disabled={!selected}  >
            <Text style={tw` ${!selected?'text-black': 'text-white font-semibold '}`} >{!selected?"Choose a Ride":"Choose "+selected?.title}</Text>
        </TouchableOpacity>
            
        </SafeAreaView>
        
    )
}

export default RideOptions

const styles = StyleSheet.create({})
