import React from 'react';
import Head from 'next/head'
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import wrapper from '../store/configureStore';

const App = ({ Component }) => { // pages의 모든 컴포넌트의 공통으로 적용됨
  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <title>next</title>
      </Head>
      <Component />
    </>
  )
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired
}

export default wrapper.withRedux(App);
