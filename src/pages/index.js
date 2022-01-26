import React, {useEffect} from 'react';
import Router from 'next/router'
import withAuth from '../middleware/withAuth'

function index() {
    useEffect(() => {
        Router.push('/browse/random')
    }, []);
  return <div></div>;
}

export default withAuth(index);
