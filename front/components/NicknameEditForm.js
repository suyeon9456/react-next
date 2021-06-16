import React from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';

const FormWrapper = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

const NicknameEditForm = () => (
  <FormWrapper>
    <Input.Search addonBefore="nickname" enterButton="수정" />
  </FormWrapper>
);

export default NicknameEditForm;
