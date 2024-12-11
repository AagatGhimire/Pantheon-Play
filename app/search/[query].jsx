import { View, Text, SafeAreaView, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { searchPosts } from '../../lib/appwrite';
import useAppWrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';

const Search = () => {
  const { query } = useLocalSearchParams()

  // use custom hook to get searched data(remaned as post) using searchPosts
  const { data: posts, refetch } = useAppWrite(
    () => searchPosts(query)

  );



  useEffect(() => {
    refetch()
  }, [query])

  // console.log(posts)

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        // data={[]}

        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4'>
            <Text className='font-pmedium text-sm text-gray-100'>
              Search Results
            </Text>
            <Text className='text-2xl font-psemibold text-white'>
              {query}
            </Text>

            <View className='mt-6 mb-8'>
              <SearchInput initialQuery={query} />

            </View>


          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No videos found'
            subtitle='No videos found for the search query'
          />
        )}



      />
    </SafeAreaView>
  )
}

export default Search