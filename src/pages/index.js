import React, {useEffect, useContext} from 'react';
import Router from 'next/router'
import withAuth from '../middleware/withAuth'
import { Context } from "../Context/Context";

function index() {
    const { user } = useContext(Context);
    useEffect(() => {
      user.subscribtion ? Router.push('/browse/random') : Router.push('/subscribtion')
    }, []);
  return <div></div>;
}

export default withAuth(index);
