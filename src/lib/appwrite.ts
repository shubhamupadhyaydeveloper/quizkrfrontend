import {Account,Client,ID,Models} from 'appwrite'
import {VITE_APPWRITE_ENDPOINT,VITE_APPWRITE_PROJECT_ID} from '@env'

export const client = new Client();
client.setEndpoint(VITE_APPWRITE_ENDPOINT) 
      .setProject(VITE_APPWRITE_PROJECT_ID)

export const account = new Account(client);