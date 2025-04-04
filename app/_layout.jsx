import { StyleSheet, Text, View } from 'react-native'
import { SplashScreen, Slot, Stack } from 'expo-router'
import { useFonts } from "expo-font";
import { useEffect } from "react";

import GlobalProvider from '../context/GLobalProvider';


// prevent splash screen from auto hiding before assets loading is complete
SplashScreen.preventAutoHideAsync();


const RootLayout = () => {

    // load fonts
    const [fontsLoaded, error] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    });

    useEffect(() => {
        // throw error if fonts are not loaded
        if (error) throw error;

        // hide splash screen if fonts are loaded
        if (fontsLoaded) SplashScreen.hideAsync();
    },
        [fontsLoaded, error])


    // return null if fonts are not loaded    
    if (!fontsLoaded && !error) return null;


    return (
        <GlobalProvider>
            <Stack>
                <Stack.Screen name='index' options={
                    {
                        headerShown: false,
                    }
                }
                />

                <Stack.Screen name='(auth)' options={
                    {
                        headerShown: false,
                    }
                }
                />

                <Stack.Screen name='(tabs)' options={
                    {
                        headerShown: false,
                    }
                }
                />

                <Stack.Screen name='search/[query]' options={
                {
                    headerShown: false,
                }
            }
            />
            </Stack>
        </GlobalProvider>

    )
}

export default RootLayout

