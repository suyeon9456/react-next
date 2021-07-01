import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Popover, List, Avatar, Comment } from 'antd';
import { RetweetOutlined, HeartOutlined, EllipsisOutlined, MessageOutlined, HeartTwoTone } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostContent from './PostContent';
import { LIKE_POST_REQUEST, removePost, UNLIKE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';

const PostCard = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const me = useSelector((state) => state.user.me);
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
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

  const liked = post.Liker.find((v) => v.id === id);

  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
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
                      <Button>수정</Button>
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
        <Card.Meta
          avatar={post.User.nickname[0]}
          title={post.User.nickname}
          description={<PostContent postData={post.content} />}
        />
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
                    <Avatar>{item.User.nickname[0]}</Avatar>
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
  }).isRequired,
};

export default PostCard;
