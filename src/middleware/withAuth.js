import { useContext, useState, useEffect } from "react";
import { Context } from "../Context/Context";
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  return (props) => {

    const { user } = useContext(Context);
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