
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
  const name = document.getElementById('nameimp');
  const mail = document.getElementById('emailimp');
  const pass = document.getElementById('passwordimp');
  const username = document.getElementById('userimp');
  const submit = document.getElementById('sub_but');
//-------------------------------validation -----------------------------------------
function emptyimp(str){ //function to check if there is empty fields or space on filds 
        return str === null || str.match(/^ *$/) !== null     
}
function validation() {
    let nameregex = /^[a-zA-Z\s]+$/ // the fullname must contain only big or small caracters
    let email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ // the email must  contain regular forn with only 3 domains yahoo gmail outlook
    let userregex = /^[a-zA-Z\s]+$/ // the username must contain only big or small caracters 
    if (emptyimp(name.value) |emptyimp(mail.value) |emptyimp(username.value) |emptyimp(pass.value) ){
        alert(" there is an empty fields")
        return false
    }

    if(!nameregex.test(name.value)){ //  check if the imput doesn't match the rules 
        alert("full name is wrong ")
        return false;
    }
    if(email.test(email.value)){
        alert("email is wrong ")
        return false;
    }
    if(!userregex.test(username.value)){
        alert("username is wrong ")
        return false;
    }

return true
}


// ---------------------------------------- encrypt pass -------------------------------------------
// function encPass(){   // encrypting password by passing the filds value as value and key at the same time 
//     var passwords = CryptoJS.AES.encrypt(pass.value, pass.value)
//     return passwords.toString()
// }
// ------------------------------------------register user to firebase -------------------------------------------
function RegisterUser(){
    
    

    if(!validation()){//if the inputs validation returns false the function will stop nothing willl continue executing 
        return;
    } 
    const dbRef = ref(db); //database refence 
    get(child(dbRef,"UsersList/"+username.value)).then ((snapshot)=> {
        if(snapshot.exists()){       //check if the user exists or not
            alert("user already exist !!")
        }else{
            set(ref(db,"UsersList/"+username.value),      //add users value to the database
            {
                fullname:name.value,
                email:mail.value,
                username:username.value,
                password:pass.value
            }).then(()=>{       //alert  when the user is inserted to the database
                alert("user created succesfully ")

            }).catch((error)=>{    // catch the error if there's an error 
                alert("error"+error)
            })
        }
    })
}
//--------------------------------------------- assign the Event ------------------------------------
submit.addEventListener('click',RegisterUser)















