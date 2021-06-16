import React from 'react';
import PropTypes from 'prop-types'
import { Button, Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  text-align: center;
  margin: 10px 0;
`;

const FollowList = ({ header, data }) => ((
  <List
    header={<div>{header}</div>}
    grid={{ gutter: 4, xs: 2, md: 3 }}
    size="small"
    bordered
    loadMore={
      <ButtonWrapper><Button>더보기</Button></ButtonWrapper>
    }
    dataSource={data}
    renderItem={(item) => (
      // console.log('item', item);
      <List.Item style={{ marginTop: 20 }}>
        <Card actions={[<StopOutlined key="stop" />]}>
          <Card.Meta description={item.nickname} />
        </Card>
      </List.Item>
    )}
  />
));

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
}

export default FollowList;
