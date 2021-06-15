import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { addPost } from '../reducers/post';
import { useDispatch, useSelector } from 'react-redux';

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const imageRef = useRef();
  const onClickImageUpload = useCallback(() => {
    imageRef.current.click();
  }, [imageRef.current])

  const onSubmit = useCallback(() => {
    dispatch(addPost);
  }, []);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
      <div>
        <input type="file" multiple hidden ref={imageRef} />
        <Button onClick={onClickImageUpload}>IMAGE UPLOAD</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">POST UPLOAD</Button>
      </div>
      <div>
        {imagePaths.map((v) => {
          return (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={v} style={{ width: '200px' }} alt={v} />
              <div>
                <Button>DELETE</Button>
              </div>
            </div>
          )
        })}
      </div>
    </Form>
  )
};

export default PostForm;
