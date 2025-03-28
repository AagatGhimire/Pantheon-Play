import { StatusBar } from "expo-status-bar";
import { Text, View, Image, ScrollView } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from '../constants'
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GLobalProvider";


export default function App() {

    const { isLoading, isLoggedIn} = useGlobalContext();

    if(!isLoading && isLoggedIn) {
        return <Redirect href={'/home'} />
    }

    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className='w-full justify-center items-center min-h-[85vh] px-4 '>
                    <Image
                        source={images.logo}
                        className='w-[130px] h-[84px]'
                        resizeMode='contain'
                    />

                    <Image
                        source={images.cards}
                        className="max-w--[380px] w-full h-[300px]"
                        resizeMode='contain'
                    />

                    <View className='relative mt-5'>
                        <Text className='text-3xl text-white text-center font-bold'>
                            Discover Endless Possibilities With {''}
                            <Text className='text-secondary-200'>Pantheon Play</Text>
                        </Text>
                        <Image
                            source={images.path}
                            className='w-[300px] h-[24px] absolute -bottom-4 right-1'
                            resizeMode='contain'
                        />
                    </View>
                    <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
                        Where creativity meets innovation: Embark on a journey of limitless exploration with Pantheon Play
                    </Text>

                    <CustomButton
                        title='Get Started'
                        handlePress={() => router.push('/sign-in')}
                        containerStyles='w-full mt-7 '
                    />


                </View>
            </ScrollView>

            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
}

