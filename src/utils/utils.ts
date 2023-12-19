// firebaseUtils.ts

import { retrievePostsFromFirebase } from "./firebaseUtils";

// import { retrievePostsFromFirebase } from "../utils/firebaseUtils";

export const fetchFirebaseData = async () => {
  try {
    const data = await retrievePostsFromFirebase();
    console.log("hibro", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
