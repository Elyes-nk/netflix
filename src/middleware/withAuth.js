import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [verify, setVerify] = useState(false);
    const router = useRouter()
    useEffect(() => {
      const verifyToken = async() => {
        try{
          const res = await axios.get(`${process.env.API_URL}/auth/verify` ,{
            headers: {
              token:JSON.parse(localStorage.getItem("user")).accessToken,
            },
          })
          setVerify(true)
        }catch(err){
          localStorage.removeItem("user");
          router.push("/login")
        }
      }
      verifyToken();
    }, []);

    if (verify) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;