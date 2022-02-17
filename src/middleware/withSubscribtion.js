import { useContext, useState, useEffect } from "react";
import { Context } from "../Context/Context";
import { useRouter } from 'next/router';

const withSubscribtion = (WrappedComponent) => {
  return (props) => {

    const { user } = useContext(Context);
    const [verify, setVerify] = useState(false);
    const router = useRouter()
    useEffect(() => {
      // ajouter condition abbonnement valide 
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