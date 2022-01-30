import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../authContext/AuthContext";
import { useRouter } from 'next/router';

const withSubscribtion = (WrappedComponent) => {
  return (props) => {

    const { user } = useContext(AuthContext);
    const [verify, setVerify] = useState(false);
    const router = useRouter()
    useEffect(() => {
      if(user.subscribtion !== null){
        setVerify(true)
      }else{
        router.push("/subscribtion")
      }
    }, []);

    if (verify) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withSubscribtion;