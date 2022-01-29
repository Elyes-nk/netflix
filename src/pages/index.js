import React, {useEffect} from 'react';
import Router from 'next/router'
import withAuth from '../middleware/withAuth'

function index() {
    // if user has subscribtion redirect to home
    // if user has not subscribtion redirect to subscribtions

    useEffect(() => {
        Router.push('/browse/random')
    }, []);
  return <div></div>;
}

export default withAuth(index);
