import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  databaseURL: "https://find-my-device-8668e-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
