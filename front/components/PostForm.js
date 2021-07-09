import React, { useCallback, useRef, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { ADD_POST_REQUEST, REMOVE_IMAGES, UPLOAD_IMAGES_REQUEST } from '../reducers/post';
import useInput from '../hooks/useInput';

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const imageRef = useRef();
  const onClickImageUpload = useCallback(() => {
    imageRef.current.click();
  }, [imageRef.current]);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('포스트 내용을 입력하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text]);

  const removeImage = useCallback((i) => () => {
    dispatch({
      type: REMOVE_IMAGES,
      data: i,
    });
  }, []);

  const onChangeImages = useCallback((e) => {
    console.log(e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => { // e.target.files가 유사배열임
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
      <div>
        <input type="file" name="image" multiple hidden ref={imageRef} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>IMAGE UPLOAD</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">POST UPLOAD</Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
              <div>
                <Button onClick={removeImage(i)}>DELETE</Button>
              </div>
            </div>
          )
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
