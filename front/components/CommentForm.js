import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../reducers/post';

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [comment, onChangeComment, setComment] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setComment('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    console.log(post.id, id, comment);
    dispatch(addComment({ id, comment, postId: post.id }));
  }, [comment]);
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea rows={4} value={comment} onChange={onChangeComment} />
        <Button style={{ position: 'absolute', right: 0, bottom: -40 }} type="primary" htmlType="submit">COMMENT UPDATE</Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired
}

export default CommentForm;