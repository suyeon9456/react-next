import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);
  return (
    <AppLayout>
      <Head>
        <title>
          {singlePost.User.nickname} 의 게시물
        </title>
        <meta name="description" content={singlePost.content} />
        {/* url 링크 공유시 아래 아래 설정에 따라 보내짐 */}
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        {/* favicon.ico 은 public폴더안에 png 파일로 넣어준다. */}
        <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'} />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

/*
  동적 라우터에서 getStaticProps를 사용하기 위해선 getStaticPaths가 필요하다
  이유는 getStaticProps는 빌드할 때 미리 html 로 만들어서 보내주기 때문에
  동적으로 받아올 path를 미리 설정해 주어야 한다.
  사용방법은
  if (router.isFallback) { // 위 컴포넌트 안에 있어야 함
    return <div>로딩중...</div>
  }
  export default function getStaticPaths () {
    return {
      paths: [
        { params: { id: '1' } },
        { params: { id: '2' } },
        { params: { id: '3' } }
      ], 이 paths 배열에 존재하지 않는다면 페이지에는 에러가 표시된다.
         그래도 getStaticPaths를 사용하고 싶다면 axios.get 으로 전체 리스트를 받아와 id를 하나씩 배열로 넣어주면된다.
      fallback: false, // 이 설정은 만약 paths에 없는 param조회 시, 마치 csr 방식과 같이 데이터를 받아오는 동안의 시간을 기다려준다.
                       // 만약 그 시간동안 화면을 띄어주고 싶다면 위의 if문을 참고한다.
    }
  }
*/

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch({
    type: LOAD_POST_REQUEST,
    data: params.id,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Post;
