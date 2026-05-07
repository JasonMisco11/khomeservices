"use server";

import { ID, Query } from "node-appwrite";

import {
  DATABASE_ID,
  USER_COLLECTION_ID,
  databases,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newuser);
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

// REGISTER USER
export const registerUser = async ({
  identificationDocument,
  ...userDetails
}: RegisterUserParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    // let file;
    // if (identificationDocument) {
    //   const inputFile =
    //     identificationDocument &&
    //     InputFile.fromBlob(
    //       identificationDocument?.get("blobFile") as Blob,
    //       identificationDocument?.get("fileName") as string
    //     );

    //   file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    // }

    // Create new user document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newRegisteredUser = await databases.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        // identificationDocumentId: file?.$id ? file.$id : null,
        // identificationDocumentUrl: file?.$id
        //   ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
        //   : null,
        ...userDetails,
      }
    );

    return parseStringify(newRegisteredUser);
  } catch (error) {
    console.error("An error occurred while creating a new user:", error);
  }
};

// GET REGISTERED USER
export const getRegisteredUser = async (userId: string) => {
  try {
    const registeredUsers = await databases.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(registeredUsers.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};
