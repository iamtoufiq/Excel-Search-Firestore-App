import { retrievePostsFromFirebase } from "./firebaseUtils";

export const fetchFirebaseData = async () => {
  try {
    return await retrievePostsFromFirebase();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
