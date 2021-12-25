import firebaseInit from "../firebase/firebase.init"
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut,updateProfile,onAuthStateChanged,
    createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

firebaseInit();

const useFirebase = () =>{
    const [user,setUser] = useState({});
    const [error,setError] = useState('');
    const [orderList,setOrderList] = useState([]);
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    //sign in with google
    const signWithGoogle = (navigate,location) =>{
        signInWithPopup(auth,googleProvider)
        .then(result =>{
            setUser(result.user);
            navigate(location?.state?.from || "/");
            saveUser(result.user.email,result.user.displayName,"PUT");
        }).catch((e) =>{
          setError(e.message)
        })
    };
    
    //create account email password
    const createUser = (email,password,Fname,Lname,navigate,location) =>{
        setIsLoading(true);
        const displayName = Fname + " " + Lname
        createUserWithEmailAndPassword(auth,email,password)
        .then(result =>{
            updatedUser(Fname,Lname);
            setUser(result.user);
            navigate(location?.state?.from || "/");
            saveUser(email,displayName,"POST");
        }).catch((e) =>{
          setError(e.message)
        }).finally(() =>{
          setIsLoading(false);
        })
    };

    //Current user auth 
     useEffect( () =>{
        setIsLoading(true);
        const subscriber = onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user);
            } else {
              setUser({});
            }
            setIsLoading(false)
          });
          return subscriber;
    },[auth]);

    //sign in with email password
    const signUserWithEmailPass = (email,pass,navigate,location) =>{
        setIsLoading(true);
        signInWithEmailAndPassword(auth,email,pass)
        .then(result =>{
            navigate(location?.state?.from || "/");
            Swal.fire(
                result.user.displayName+' Successfully LoggedIn!',
                'Now You are Logged In!',
                'success'
              ).then(res =>{
                  if(res.isConfirmed){
                    setUser(result.user);
                    setError('');
                  }
              })
        }).catch(e =>{
          setError(e.message);
        }).finally(() =>{
          setIsLoading(false);
      })
    };

    //updated user profile
    const updatedUser = (firstName,LastName) =>{
        updateProfile(auth.currentUser, {
            displayName:firstName+" " + LastName
          }).then(() => {
            setError('');
          }).catch((e) => {
            setError(e.message);
          });
    };

    // sign out user
    const signOutUser = () =>{
        signOut(auth).then(() => {
            Swal.fire(
                user.displayName+' Successfully Logged Out!',
                'Your Profile Logged Now!',
                'success'
              ).then(res =>{
                if(res.isConfirmed){
                  setError('');
                  setUser({})
                }
            });
          })
    };

    //Admin 
    useEffect(() =>{
        fetch(`http://localhost:5000/users/${user.email}`)
        .then(res => res.json())
        .then(data =>setAdmin(data.admin))
    },[user.email]);

    // All Service getting from db
    useEffect(() =>{
      fetch('http://localhost:5000/services')
      .then(res => res.json())
      .then(data => setServices(data))
    },[]);

    //Get All Order From Db by user email
    useEffect(()=>{
      fetch(`http://localhost:5000/orderList/${user.email}`)
      .then(res => res.json())
      .then(data => setOrderList(data))
    },[user.email]);

    // User Details set On DataBase
    const saveUser = (email,displayName,method) =>{
          const user = {email,displayName};

          fetch('http://localhost:5000/users',{
            method:method,
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify(user)
          }).then(result =>{
            if(result.status === 200){
              Swal.fire(
                displayName+' Successfully Registrated!',
                'Please Login Now!',
                'success'
              )
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
            }
            setUser(user)
          }).catch((e) =>{
            setError(e.message)
          })
    }

    return{
        user,
        error,
        isLoading,
        admin,
        services,
        orderList,
        setOrderList,
        setIsLoading,
        setError,
        signWithGoogle,
        signOutUser,
        createUser,
        signUserWithEmailPass,
        updatedUser
    }
}
export default useFirebase;