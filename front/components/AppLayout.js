import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import useInput from '../hooks/useInput';

const SearchInput = styled(Input.Search)`
  vertical-align: 'middle';
`;

const AppLayout = ({ children }) => {
  const [searchText, onChangeSerchText] = useInput('');
  const { me } = useSelector((state) => state.user);

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchText}`);
  }, [searchText]);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/"><a>HOME</a></Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile"><a>PROFILE</a></Link>
        </Menu.Item>
        <Menu.Item key="search">
          <SearchInput
            enterButton
            style={{ verticalAlign: 'middle' }}
            value={searchText}
            onChange={onChangeSerchText}
            onSearch={onSearch}
          />
        </Menu.Item>
        {
          me && me.id
          && (
            <Menu.Item key="signup">
              <Link href="/signup"><a>SIGNUP</a></Link>
            </Menu.Item>
          )
        }
      </Menu>
      <Row>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://www.naver.com" target="blank" rel="noreferrer noopener">www.naver.com</a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

// TODO... propTypes가 부족

export default AppLayout;
