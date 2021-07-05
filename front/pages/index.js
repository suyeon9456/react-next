import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

  useEffect(() => {
    function onScroll() {
      console.log('mainPosts: ', mainPosts);
      // console.log(window.scrollY,
      //   document.documentElement.clientHeight,
      //   document.documentElement.scrollHeight);

      if (window.scrollY + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, hasMorePosts, loadPostsLoading]);
  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  /*
    ssr에서 브라우저는 개입하지 않고 프론트에서 백으로 요청하기 때문에
    쿠키를 따로 설정하여 요청하여야 한다.
  */
  // const cookie = req ? req.headers.cookie : '';
  // axios.defaults.headers.Cookie = cookie;

  /*
    하지만 위 방식으로만 작업할 경우 치명적인 오류가 생긴다.
    그 오류는 front 서버는 하나이기 때문에 한 유저의 cookie가 등록될 경우 다른 유저에게도 공유된다는 것이다.
    즉 누군가 로그인을 하고난 후 다른 유저가 사이트에 방문했을 때 처음 로그인한 유저의 정보로 로그인 되어있는 상태가 발생한다.
    따라서 아래와 같이 설정해 주는 것이 중요하다.
  */
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Home;
