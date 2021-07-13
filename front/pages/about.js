import React from 'react';
import { Card, Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import wrapper from '../store/configureStore';
import { LOAD_USER_REQUEST } from '../reducers/user';
import AppLayout from '../components/AppLayout';

const About = () => {
  const { Posts, Followings, Followers, nickname } = useSelector((state) => state.user.userInfo);

  // const dispatch = useDispatch();
  // const { logoutLoading } = useSelector((state) => state.user);

  // const onLogout = useCallback(() => {
  //   dispatch(logoutAction());
  // }, []);

  return (
    <AppLayout>
      <Card
        actions={[
          <div key="twit">트윗<br /> {Posts}</div>,
          <div key="followings">팔로잉<br /> {Followings}</div>,
          <div key="followers">팔로워<br /> {Followers}</div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{nickname[0]}</Avatar>}
          title={nickname}
        />
        {/* <Button onClick={onLogout} loading={logoutLoading}>LOGOUT</Button> */}
      </Card>
    </AppLayout>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  // getStaticProps는 데이터가 거의 변하지 않는 경우에 사용하기 좋다
  // build할 때 html로 제공하기 때문에 서버에 부담을 줄여준다.
  store.dispatch({
    type: LOAD_USER_REQUEST,
    data: '3',
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default About;
