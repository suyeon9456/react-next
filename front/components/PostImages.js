import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
// import Slick from 'react-slick';
import ImageZoom from './ImageZoom';
// import { Global, SlickWrapper } from './ImageZoom/styles';

const PostImages = ({ images }) => {
  // const [currentSlide, setCurrentSlide] = useState(0);
  const [showImagesZoom, setShowImageZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImageZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImageZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img role="presentation" src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <img role="presentation" width="50%" src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        <img role="presentation" width="50%" src={`http://localhost:3065/${images[1].src}`} alt={images[1].src} onClick={onZoom} />
        {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <img role="presentation" style={{ width: '50%', display: 'inline-block' }} src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
      <div
        role="presentation"
        style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
        onClick={onZoom}
      >
        <PlusOutlined />
        <br />
        {images.length - 1}
        개의 사진 더보기
      </div>
      {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
    </>
  );

  // return (
  //   <>
  //     <Global />
  //     <div style={{ width: '100%', overflow: 'hidden', textAlign: 'center' }}>
  //       <Slick
  //         initialSlide={0}
  //         beforeChange={(slide) => setCurrentSlide(slide)}
  //         arrows
  //         slidesToShow={1}
  //         slidesToScroll={1}
  //         dots
  //       >
  //         {images.map((v) => (
  //           <div style={{ textAlign: 'center' }} key={v.src}>
  //             <img style={{ margin: '0 auto', maxHeight: '750px' }} src={`http://localhost:3065/${v.src}`} alt={v.src} onClick={onZoom} />
  //           </div>
  //         ))}
  //       </Slick>
  //     </div>
  //     {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
  //   </>
  // );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.any),
};

export default PostImages;
