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
    const postsCollection = collection(db, "posts");
    const batch = writeBatch(db);

    postData.forEach((post) => {
      const newDocRef = doc(postsCollection);
      batch.set(newDocRef, post);
    });

    await batch.commit();

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
    const postsCollection = collection(db, "posts");

    const querySnapshot = await getDocs(postsCollection);

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
