import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image, Button } from 'react-native'
import React, { useState } from 'react'
import * as Animatible from 'react-native-animatable'
import { icons } from '../constants'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useEvent } from 'expo'
import { Video, ResizeMode } from 'expo-av'

const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1.1
  }
}

const zoomOut = {
  0: {
    scale: 1.1
  },
  1: {
    scale: 0.9
  }
}

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false)
  // console.log('item', item.video)
  const videoPlayer = useVideoPlayer(item.video, player => {
    if (play) {
      player.play();
    } else {
      player.pause();
    }
  })
  

  return (
    <Animatible.View
      className='mr-5'
      animation={activeItem == item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        // <Video
        //   source={{uri:'https://player.vimeo.com/video/949618057?h=d60220d68d'}}
        //   className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
        // />
        // console.log('videoPlayer', videoPlayer),
        <VideoView
          className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
          player={videoPlayer}
         // status change
        />
      ) : (
        <TouchableOpacity
          className='relative justify-center items-center'
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
            resizeMethod='cover'
          />
          <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </Animatible.View>
  )
}





const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem
          activeItem={activeItem}
          item={item}
        />


      )}

      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70
      }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  )
}

export default Trending