// utils/firebaseUtils.ts

import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface PostDatatypes {
  __EMPTY?: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
}

export const addPostsToFirebase = async (postData: PostDatatypes[]) => {
  try {
    // Reference to the "posts" collection
    const postsCollection = collection(db, "posts");

    // Use batch writes for improved performance
    const batch = writeBatch(db);

    // Iterate through the array and add each item to the "posts" collection
    postData.forEach((post) => {
      const newDocRef = doc(postsCollection);
      batch.set(newDocRef, post);
    });

    // Commit the batch
    await batch.commit();

    // Display a success toast message
    toast.success("Excel sheet uploaded successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  } catch (error) {
    console.error("Error adding posts:", error);

    // Display an error toast message
    toast.error("Error adding posts", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};

export const retrievePostsFromFirebase = async (): Promise<PostDatatypes[]> => {
  try {
    // Reference to the "posts" collection
    const postsCollection = collection(db, "posts");

    // Get all documents from the "posts" collection
    const querySnapshot = await getDocs(postsCollection);

    // Extract data from each document
    const postsData: PostDatatypes[] = [];
    querySnapshot.forEach((doc) => {
      const postData = doc.data() as PostDatatypes;
      postsData.push(postData);
    });

    return postsData;
  } catch (error) {
    console.error("Error retrieving posts:", error);
    return [];
  }
};
