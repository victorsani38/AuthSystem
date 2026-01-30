import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { app } from "../firebase";
import API from "../api/axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
export default function OAuth (){
     const {setUser} = useAuth()
    const handleGoogleClick =async () => {
       
        try{
        const auth = getAuth(app)
         const provider = new GoogleAuthProvider();
         const result = await signInWithPopup(auth, provider)
       
         const googleData = {
            name:result.user.displayName,
            email:result.user.email,
            pic:result.user.photoURL
         }

         const res = await API.post("/users/google",googleData);
         setUser(res.data.user)
         toast.success(res.data.message || "Logged in with Google!");
         window.location.href = "/dashboard"; // redirect after login

        }
        catch(error){
        if(error.response && error.response.data.error){
            toast.error(error.response.data.error || "something went wrong")
        }else{
            toast.error("could not connect to google")
        }
        }
    }
    return(
        <div className="mb-4 flex justify-center">
          <button type="button"className="flex items-center gap-2 border border-gray-300 text-gray-700 
            py-2.5 px-5 rounded-md text-sm font-medium hover:bg-gray-100 transition"
            onClick={handleGoogleClick}
            >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Signup with Google
          </button>
        </div>
    )
}