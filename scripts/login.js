// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcH-RZrNHD3nrmRxrA7En1Bd5U9UBHMSA",
  authDomain: "jsnative-2f45c.firebaseapp.com",
  databaseURL: "https://jsnative-2f45c-default-rtdb.firebaseio.com",
  projectId: "jsnative-2f45c",
  storageBucket: "jsnative-2f45c.appspot.com",
  messagingSenderId: "122734953593",
  appId: "1:122734953593:web:c467bd1c1e31ebff4500a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import{getDatabase , child,ref ,set,get ,update,remove} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const db = getDatabase();
// ------------------------------------ the References ----------------------------------

const pass = document.getElementById('passwordimp');
const username = document.getElementById('userimp');
const submit = document.getElementById('sub_but');

// ------------------------------------- authenticate user ---------------------------------
function authenticate(){
    const dbRef = ref(db)
    get(child(dbRef,"UsersList/"+username.value)).then ((snapshot)=> {
        if(snapshot.exists()){       //check if the user exists or not
            let dbpass = snapshot.val().password
            if(dbpass == pass.value){
                login(snapshot.val())
            }else{
                alert("user does not exist ")
            }
        }else{
           alert("username or password is invalid")
        }
    })
}

// ------------------------ login ----------------------------------
function login(user){
let keep = document.getElementById('flexSwitchCheckChecked').checked
if(!keep){// if the keep me logged in not checked we will open session storage in the browser else we will save data into local storage permanentally 
    sessionStorage.setItem('user',JSON.stringify(user))
    window.location = "../home.html"
}else{
    localStorage.setItem('loged in','yes')
    localStorage.setItem('user',JSON.stringify(user))
    window.location = "../update.html"
}
}


//-------------------------- submit ------------------------------------------

submit.addEventListener('click',authenticate)