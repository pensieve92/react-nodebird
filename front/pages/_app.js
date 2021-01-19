import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
// import withReduxSaga from 'next-redux-saga'; // 필요 없어짐

import wrapper from '../store/configureStore';

const App = ({Component}) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>NodeBird</title>                
            </Head>
            <div>공통메뉴</div>
            <Component />
        </>
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

// export default wrapper.withRedux(withReduxSaga(App));
export default wrapper.withRedux(App);