import React, { useCallback } from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch } from 'react-redux';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const FormWrapper = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

const NicknameEditForm = () => {
  const [nickname, onChangeNickname] = useInput('');
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: { nickname },
    });
  }, [nickname]);

  return (
    <FormWrapper>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="NICKNAME"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </FormWrapper>
  );
};

export default NicknameEditForm;
