import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PostContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v) => {
      if (v.match(/(#[^\s#]+)/)) {
        return (
          <Link href={`/hashtag/${v.slice(1)}`}>
            <a>{v}</a>
          </Link>
        );
      }
      return v;
    })}
  </div>
);

PostContent.propTypes = {
  postData: PropTypes.string.isRequired
};

export default PostContent;
