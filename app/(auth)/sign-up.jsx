import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { React, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'

const SignUp = () => {

  //form state
  const [form, setForm] = useState(
    {
      username:'',
      email: '',
      password: '',
    }
  )

  const [isSubmitting, setIsSubmitting] = useState(false)

  // submit function 
  const submiit = async() => {
    if(!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'All fields are required')
    }

    setIsSubmitting(true);
    
    
    try{
    const result=await createUser(form.email, form.password, form.username);
   
    
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
            Register to Pantheon Play
            </Text>

          {/* form field */}

          {/* username field */}
          <FormField
            title='Username'
            value={form.username}
            handleChangeText={(e) => setForm({
              ...form,
              username: e,
            })}
            otherStyles='mt-10'
          />


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
            title='Sign Up'
            handlePress={submiit}
            containerStyles='mt-7 '
            isLoading={isSubmitting}
          />

          {/* navigate to sign in screen */}
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Already have an account?
            </Text>
            <Link
              href='/sign-in'
              className='text-lg font-psemibold text-secondary'
            >
              Log in.
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp