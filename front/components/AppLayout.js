import PropTypes from 'prop-types'
import Link from 'next/link'

const AppLayout = ({ children }) => {
  return (
    <div>
      <Link href="/"><a>공통메뉴</a></Link>
      <Link href="/profile"><a>프로필</a></Link>
      <Link href="/signup"><a>회원가입</a></Link>
      {children}
    </div>
  )
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
};

// TODO... propTypes가 부족

export default AppLayout;
