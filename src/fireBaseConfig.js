import { getAnalytics, logEvent } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyAjLZisoS62UrC1JoV-ZROrjwKNrkhilLw",
  authDomain: "kwildb-dashboard.firebaseapp.com",
  projectId: "kwildb-dashboard",
  storageBucket: "kwildb-dashboard.appspot.com",
  messagingSenderId: "148254273801",
  appId: "1:148254273801:web:4c350aad807ea4463ae3d8",
  measurementId: "G-7GQ4K08VME",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const perf = getPerformance(app);

export const log = (event) => {
  logEvent(analytics, event);
};
