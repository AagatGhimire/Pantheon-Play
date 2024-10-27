import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';
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


export const signIn=async(email, password)=> {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getCurrentUser= async()=>{
    try {
        const currentAccount= await account.get();

        if(!currentAccount){
            throw new Error('No user found');
        }

        const currentUser= await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser){
            throw new Error('No user found');
        }

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}


