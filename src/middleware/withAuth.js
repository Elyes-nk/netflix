import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../authContext/AuthContext";
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  return (props) => {

    const { user } = useContext(AuthContext);
    const [verify, setVerify] = useState(false);
    const router = useRouter()
    useEffect(() => {
      if(user){
        setVerify(true)
      }else{
        router.push("/login")
      }
    }, []);

    if (verify) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;