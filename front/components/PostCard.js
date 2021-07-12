import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Popover, List, Avatar, Comment, Input, Form } from 'antd';
import { RetweetOutlined, HeartOutlined, EllipsisOutlined, MessageOutlined, HeartTwoTone } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import moment from 'moment';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostContent from './PostContent';
import { CHANGE_UPDATE_STATUS, LIKE_POST_REQUEST, removePost, RETWEET_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';
import useInput from '../hooks/useInput';
import PostForm from './PostForm';

moment.locale('ko');

const PostCard = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const me = useSelector((state) => state.user.me);
  const { removePostLoading, isUpdated } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  // const [liked, setLiked] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

  const onLiked = useCallback(() => {
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);
  const onUnLiked = useCallback(() => {
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onToggleCommentsOpen = useCallback(() => {
    setCommentsOpen((prev) => !prev);
  }, []);
  const delPost = useCallback(() => {
    dispatch(removePost(post.id));
  }, []);

  const onRetweet = useCallback(() => {
    dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, []);

  const udatePost = useCallback(() => {
    dispatch({
      type: CHANGE_UPDATE_STATUS,
      data: post.id,
    });
  }, []);

  const liked = post.Liker.find((v) => v.id === id);

  return (
    <div>
      <Card
        cover={isUpdated === post.id ? '' : post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnLiked} />
            : <HeartOutlined key="heart" onClick={onLiked} />,
          <MessageOutlined key="message" onClick={onToggleCommentsOpen} />,
          <Popover
            key="ellipsis"
            content={(
              <Button.Group>
                {id && id === post.User.id
                  ? (
                    <>
                      <Button onClick={udatePost}>수정</Button>
                      <Button type="danger" loading={removePostLoading} onClick={delPost}>삭제</Button>
                    </>
                  )
                  : <Button>신고</Button>}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={me && <FollowButton post={post} />}
      >
        {
          post.RetweetId && post.Retweet
            ? (
              <Card
                title={post.RetweetId ? `${post.User.nickname} 이 리트윗한 게시글` : null}
                cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
              >
                <div style={{ float: 'right' }}>
                  {moment(post.createdAt).format('YYYY.MM.DD')}
                </div>
                <Card.Meta
                  avatar={(
                    <Link href={`/user/${post.Retweet.User.id}`}>
                      <a>
                        <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  )}
                  title={post.Retweet.User.nickname}
                  description={<PostContent postData={post.Retweet.content} />}
                />
              </Card>
            )
            : (
              <>
                <div style={{ float: 'right' }}>
                  {moment(post.createdAt).format('YYYY.MM.DD')}
                </div>
                <Card.Meta
                  avatar={(
                    <Link href={`/user/${post.User.id}`}>
                      <a>
                        <Avatar>{post.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  )}
                  title={post.User.nickname}
                  description={isUpdated === post.id
                    ? (
                      <PostForm
                        updateText={post.content}
                        updateId={post.id}
                        updateImg={post.Images}
                      />
                    )
                    : <PostContent postData={post.content} />}
                />
              </>
            )
        }
      </Card>
      {commentsOpen && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length} 개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={(
                    <Link href={`/user/${item.User.id}`}>
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  )}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
    Liker: PropTypes.arrayOf(PropTypes.any),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
