import React, {useEffect, useContext} from 'react';
import Router from 'next/router'
import withAuth from '../middleware/withAuth'
import { AuthContext } from "../authContext/AuthContext";

function index() {
    const { user } = useContext(AuthContext);
    useEffect(() => {
      user.subscribtion ? Router.push('/browse/random') : Router.push('/subscribtion')
    }, []);
  return <div></div>;
}

export default withAuth(index);
