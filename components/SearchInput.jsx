import { View, Text, TextInput, Image, Alert } from 'react-native'
import {React, useState} from 'react'
import { TouchableOpacity } from 'react-native'

import {icons} from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({initialQuery}) => {
    const pathname= usePathname()

    const [query, setQuery] = useState(initialQuery || '')
    
    return (
      
            <View className='border-2 border-black-200 w-full px-4 h-16 bg-black-100 rounded-2xl
             focus:border-secondary-100 items-center flex-row space-x-4'>
            <TextInput
                className='text-base mt-0.5 text-white flex-1 font-pregular'
                value={query}
                placeholder='Search for a video topic'
                placeholderTextColor='#CDCDE0'
                onChangeText={(e)=>setQuery(e)}
            />

            <TouchableOpacity
                onPress={()=>{
                    if(!query){
                        return Alert.alert('Missing Query', 'Please enter a topic to search')
                    }
                    if(pathname.startsWith('/search')){
                        router.setParams({query})
                    }else{
                        router.push(`/search/${query}`)
                    }
                }}
            >
                <Image
                    source={icons.search}
                    className='w-5 h-5'
                    resizeMode='contain'
                />
            </TouchableOpacity>
            </View>
     
    )
}

export default SearchInput