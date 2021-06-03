import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Menu } from 'antd'

const AppLayout = ({ children }) => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/"><a>HOME</a></Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile"><a>PROFILE</a></Link>
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup"><a>SIGNUP</a></Link>
        </Menu.Item>
      </Menu>
      {children}
    </div>
  )
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
};

// TODO... propTypes가 부족

export default AppLayout;
