// import { collection, addDoc, writeBatch, doc, commitBatch } from "firebase/firestore";
import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { db } from "../firebase";

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

    console.log("Posts added successfully");
  } catch (error) {
    console.error("Error adding posts:", error);
  }
};

// ============ retrievePostsFromFirebase ===========
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
