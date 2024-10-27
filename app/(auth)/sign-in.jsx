import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { React, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link,router } from 'expo-router'
import { signIn } from '../../lib/appwrite'

const SignIn = () => {

  //form state
  const [form, setForm] = useState(
    {
      email: '',
      password: '',
    }
  )

  const [isSubmitting, setIsSubmitting] = useState(false)

  // submit function 
  const submiit = async() => {
    if(!form.email || !form.password) {
      Alert.alert('Error', 'Fields cannot be empty')
    }

    setIsSubmitting(true);
    
    
    try{
    await signIn(form.email, form.password);

    router.replace('/home');

    }catch(error){
      Alert.alert('Error', error)
      console.log(error)

    } finally{
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          {/* logo */}
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[150px] h-[80px]'
          />

          <Text className='text-2xl text-white font-psemibold mt-10'>
            Log in to Pantheon Play
            </Text>

          {/* form field */}


          {/* email field */}
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({
              ...form,
              email: e,
            })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          {/* password field */}
          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({
              ...form,
              password: e,
            })}
            otherStyles='mt-7 '
          />

          {/* sign in button */}
          <CustomButton
            title='Sign In'
            handlePress={submiit}
            containerStyles='mt-7 '
            isLoading={isSubmitting}
          />

          {/* navigate to sign up screen */}
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account?
            </Text>
            <Link
              href='/sign-up'
              className='text-lg font-psemibold text-secondary'
            >
              Sign up.
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn