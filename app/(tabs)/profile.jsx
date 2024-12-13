import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'
import { getUserPosts, signOut } from '../../lib/appwrite';
import useAppWrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { icons, images } from '../../constants';
import EmptyState from '../../components/EmptyState';
import { useGlobalContext } from '../../context/GLobalProvider'
import InfoBox from '../../components/InfoBox';
import { router } from 'expo-router';


const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  // use custom hook to get searched data(remaned as post) using searchPosts
  const { data: posts } = useAppWrite(
    () => getUserPosts(user.$id)

  );

  const logout = async() => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)

    router.replace('/sign-in')
  }



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
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity
              className='w-full items-end mb-10'
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode='contain'
                className='w-6 h-6'
              />
            </TouchableOpacity>

            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
              <Image
                source={{ uri: user?.avatar }}
                className='w-[90%] h-[90%] rounded-lg'
                resizeMode='cover'
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />

            <View className='mt-5 flex-row'>
              <InfoBox
                title={posts.length || 0}
                subtitle='Posts'
                containerStyles='mr-10'
                titleStyles='text-xl'
              />

              <InfoBox
                title='6.9k'
                subtitle='Followers'
                titleStyles='text-xl'
              />

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

export default Profile