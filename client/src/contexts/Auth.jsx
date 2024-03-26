import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('token')||null);
  useEffect(()=>{
      const token = localStorage.getItem('token');
      if(token){
        setUser(token);
      }
  },[])

  const Login = async (userData) => {
    // Your login logic here
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`,
    {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(userData)
    })
    const data = await res.json();
    console.log(data); 
   
    if(data.success){
      setUser(data.token);
       // save into local storage
      localStorage.setItem('token', data.token);
      toast.success('login successfully!');
    }
    if(!data.success){
      setUser(null);  
      toast.error(data.error);
    }
  };

  const Register = async (userData) => {
    // Your register logic here
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/register`,
    {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(userData)
    })
    const data = await res.json();
    console.log(data); 
    
    if(data.success){
      setUser(data.token);
       // save into local storage
       localStorage.setItem('token', data.token);
      toast.success('registered successfully!');
    }
    if(!data.success){
      setUser(null);  
      toast.error(data.error);
    }
  };

  const Logout = async () => {
    // Your logout logic here
    setUser(null);
    localStorage.removeItem('token');

    toast.success('user logged out successfully')
  };

  const ContextData = {
    user,
    Login,
    Register,
    Logout,
  };

  return (
    <AuthContext.Provider value={ContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
