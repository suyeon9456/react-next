import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Popover, List, Avatar, Comment } from 'antd';
import { RetweetOutlined, HeartOutlined, EllipsisOutlined, MessageOutlined, HeartTwoTone } from '@ant-design/icons'
import { useSelector } from 'react-redux';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostContent from './PostContent';

const PostCard = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const [liked, setLiked] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

  const onToggleLiked = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);
  const onToggleCommentsOpen = useCallback(() => {
    setCommentsOpen((prev) => !prev);
  }, []);
  console.log('이미지', post);

  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLiked} />
            : <HeartOutlined key="heart" onClick={onToggleLiked} />,
          <MessageOutlined key="message" onClick={onToggleCommentsOpen} />,
          <Popover
            key="ellipsis"
            content={(
              <Button.Group>
                {id && id === post.User.id
                  ? (
                    <>
                      <Button>수정</Button>
                      <Button type="danger">삭제</Button>
                    </>
                  )
                  : <Button>신고</Button>}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
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
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
