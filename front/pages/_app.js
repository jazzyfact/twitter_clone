//공통되는 것들을 묶어놈
import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css'
import Head from 'next/head'

import wrapper from '../store/configureStore';

const NordBird = ({Component}) => {
    return (
        <>
        <Head>
            <meta charSet="uft-8"></meta>
            <title>NordBrid</title>
        </Head>
        <Component />
        </>
    )
};

NordBird.PropTypes = {
    Component : PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(NordBird);