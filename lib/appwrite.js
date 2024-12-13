import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';
import { config } from './config';


const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);


// create a new user
export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username,
        )

        if (!newAccount) {
            throw new Error('Account not created');
        }

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
            },
        );

        return newUser;

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

// sign in user
export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

// get current user
export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) {
            throw new Error('No user found');
        }

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) {
            throw new Error('No user found');
        }

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}

// fetch all posts
export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videosCollectionId
        )

        return posts.documents;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

// fetch latest posts
export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videosCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )

        return posts.documents;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}


// search posts
export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videosCollectionId,
            [Query.search('title', query)]
        )

        return posts.documents;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

// user's posts
export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videosCollectionId,
            [Query.equal('creator', userId)]
        )

        return posts.documents;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

// sign out
export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');

        return session;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

// get file preview
export const getFilePreview = async(fileId, type)=>{
    let fileUrl;

    try{
        if(type==='video'){
            fileUrl= storage.getFileView(config.storageId,fileId);
        }else if(type==='image'){
            fileUrl= storage.getFilePreview(
                config.storageId,
                fileId, 
                2000, 
                2000, 
                'top',
                 100
                );
        }else{
            throw new Error('Invalid file type')
        }
    if(!fileUrl){
        throw new Error('File not found')
    }

    return fileUrl;
    }catch(error){
        console.log(error)
        throw new Error(error)
    }
}

// upload file
export const uploadFile= async(file,type)=>{
    if(!file){
        return;
    }else{
        const {mimeType, ...rest}=file;
        const asset= {type: mimeType, ...rest};

        try{
            const uploadedFile=await storage.createFile(
                config.storageId,
                ID.unique(),
                asset
            )

            const fileUrl=await getFilePreview(uploadedFile.$id, type);
            return fileUrl;  
        }catch(error){
            console.log(error)
            throw new Error(error)
        }
    }
}

// create a new post
export const createPost= async(form)=>{
    try{
        const [thumbnailUrl, videoUrl]= await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')

        ])

        const newPost=await databases.createDocument(
            config.databaseId,
            config.videosCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator:form.userId
            }
        )

        return newPost;
    }catch(error){
        console.log(error)
        throw new Error(error)
    }
}