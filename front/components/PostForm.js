import React, { useCallback, useRef, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { ADD_POST_REQUEST, REMOVE_IMAGES, UPDATE_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST, REMOVE_UPD_IMAGES, CANCEL_UPD_IMAGES } from '../reducers/post';
import useInput from '../hooks/useInput';

const PostForm = ({ updateText = '', updateId = null, updateImg = [] }) => {
  const { imagePaths, addPostDone, isUpdated, removeImages } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (isUpdated === updateId && updateText) {
      setText(updateText);
    }
  }, [isUpdated, updateText]);

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
      formData.append('image', p.filename);
    });
    if (isUpdated && isUpdated === updateId) {
      formData.append('content', text);
      formData.append('postId', updateId);
      removeImages.forEach((p) => {
        formData.append('removeImages', p.id);
      });
      return dispatch({
        type: UPDATE_POST_REQUEST,
        data: formData,
      });
    }
    formData.append('content', text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths, removeImages]);

  const removeImage = useCallback((i) => () => {
    dispatch({
      type: REMOVE_IMAGES,
      data: i,
    });
  }, []);

  const removeUpdImages = useCallback((image) => () => {
    dispatch({
      type: REMOVE_UPD_IMAGES,
      data: { id: image.id, postId: image.PostId },
    });
  }, []);

  const cancelUpdImages = useCallback((image) => () => {
    dispatch({
      type: CANCEL_UPD_IMAGES,
      data: { id: image.id },
    });
  }, []);

  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => { // e.target.files가 유사배열임
      imageFormData.append('image', f);
    });
    if (isUpdated) {
      imageFormData.append('postId', updateId);
    }
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
        {isUpdated === updateId && updateImg.map((v) => (
          (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={`http://localhost:3065/${v.src}`} style={{ width: '200px' }} alt={v} />
              <div>
                {
                  removeImages.find((id) => id === v.id)
                    ? <Button onClick={cancelUpdImages(v)}>CANCEL</Button>
                    : <Button onClick={removeUpdImages(v)}>DELETE</Button>
                }
              </div>
            </div>
          )
        ))}
        {imagePaths.filter((f) => f.postId === updateId).map((v, i) => (
          (
            <div key={v.filename} style={{ display: 'inline-block' }}>
              <img src={`http://localhost:3065/${v.filename}`} style={{ width: '200px' }} alt={v.filename} />
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

PostForm.propTypes = {
  updateText: PropTypes.string.isRequired,
  updateId: PropTypes.number.isRequired,
  updateImg: PropTypes.array.isRequired,
};

export default PostForm;
