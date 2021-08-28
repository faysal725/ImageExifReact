import firebase from 'firebase/app'
import 'firebase/storage'
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";




const firebaseConfig = {

    apiKey: "AIzaSyABYWCOxTf5qyYa2_1bJU182mBTUGFKjPo",
  
    authDomain: "imageupload-419ec.firebaseapp.com",
  
    projectId: "imageupload-419ec",
  
    storageBucket: "imageupload-419ec.appspot.com",
  
    messagingSenderId: "566346893536",
  
    appId: "1:566346893536:web:d4c762a709a2795f1fa885"
  
  };

  firebase.initializeApp(firebaseConfig);
  var storage = firebase.storage();
  export default storage;
  
 
