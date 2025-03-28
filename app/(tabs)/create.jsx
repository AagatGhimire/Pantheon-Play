import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'

import FormField from '../../components/FormField'
import { Video } from 'expo-av'
import { icons } from '../../constants'
import { useVideoPlayer, VideoView } from 'expo-video'
import CustomButton from '../../components/CustomButton'
import * as DocumentPicker from 'expo-document-picker'
import { router } from 'expo-router'
import { createPost } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GLobalProvider'

const Create = () => {
  const {user}= useGlobalContext()

  const [uploading, setUploading] = useState(false)

  const [play, setPlay] = useState(false)
  // console.log('item', item.video)


  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  })


  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === 'image'
        ? ['image/png', 'image/jpg', 'image/jpeg']
        : ['video/mp4', 'video/gif']
    })

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] })
      }
      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0] })
      }
    } 
  }

  const submit = async  () => {
    if (!form.prompt || !form.title || !form.video || !form.thumbnail) {
      return Alert.alert('Error', 'All fields are required')
    } else {
      setUploading(true)
      try {
        await createPost(
          {
            ...form, 
            userId: user.$id
          }
        )

        
        Alert.alert('Success', 'Video uploaded successfully')
        router.push('/home')
      } catch (error) {
        console.log('Error uploading', error)
        Alert.alert('Error', error)
      } finally {
        setForm({
          title: '',
          video: null,
          thumbnail: null,
          prompt: '',
        })

        setUploading(false)
      }
    }
  }


  const videoPlayer = useVideoPlayer(form.video, player => {
    if (play) {
      player.play();
    } else {
      player.pause();
    }
  })

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white font-psemibold'>
          Upload Video
        </Text>

        <FormField
          title='Video Title'
          value={form.title}
          placeholder='Give your video a title...'
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles='mt-10'
        />

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-green-100 font-pmedium'>
            Upload Video
          </Text>

          <TouchableOpacity
            onPress={() => openPicker('video')}
          >
            {form.video ? (
              // <Video

              // />
              <VideoView
                className='w-full h-64 rounded-2xl'
                player={videoPlayer}
              // status change
              />
            ) :
              (
                <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                  <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                    <Image
                      source={icons.upload}
                      resizeMode='contain'
                      className='w-1/2 h-1/2'
                    />
                  </View>

                </View>
              )
            }
          </TouchableOpacity>
        </View>

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-green-100 font-pmedium'>
            Video Thumbnail
          </Text>

          <TouchableOpacity
            onPress={() => openPicker('image')}

          >
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode='cover'
                className='w-full h-64 rounded-2xl'
              />
            ) :
              (
                <View
                  className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2'
                >
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className='w-5 h-5'
                  />
                  <Text className='text-sm text-gray-100 font-pmedium'>
                    Choose a file
                  </Text>

                </View>
              )
            }
          </TouchableOpacity>
        </View>


        <FormField
          title='AI Prompt'
          value={form.prompt}
          placeholder='The prompt used to create the video...'
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles='mt-7'
        />

        <CustomButton
          title='Submit and Upload'
          handlePress={submit}
          containerStyles='mt-7 '
          isLoading={uploading}
        />


      </ScrollView>
    </SafeAreaView>
  )
}

export default Create