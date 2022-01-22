import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios"

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [verify, setVerify] = useState(false);

    //useless
    useEffect(() => {
        const verifyToken = async() => {
          try{
            const token = localStorage.getItem("token");
            console.log(token)
            const res = await axios.get('http://localhost:3030/api/auth/verifytoken', {
              headers: {
                "authorization":token
              }
            })
            setVerify(true)
          }catch(err){
            localStorage.removeItem("token");
            router.push("/login");
          }
        }
        verifyToken();
    }, [])



    if (verify) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;