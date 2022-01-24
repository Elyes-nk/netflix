import React, {useEffect} from 'react';
import Router from 'next/router'

function index() {
    useEffect(() => {
        Router.push('/browse/random')
    }, []);
  return <div></div>;
}

export default index;
