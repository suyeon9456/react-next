import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Header = styled.header`
  height: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }

  & button {
    position: absolute;
    right: 0;
    top: 0;
    padding: 15px;
    line-height: 14px;
    cursor: pointer;
  }
`;

const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #090909;
`;

const ImageWrapper = styled.div`
  padding: 32px;
  text-align: center;

  & img {
    margin: 0 auto;
    max-height: 750px;
  }
`;

const Indicator = styled.div`
  text-align: center;

  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #313131;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
  }
`;

const ImageZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <Header>
        <h1>이미지 전체화면</h1>
        <button onClick={onClose}>CLOSE</button>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            beforeChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => {
              return (
                <ImageWrapper key={v.src}>
                  <img src={v.src} alt={v.src} />
                </ImageWrapper>
              )
            })}
          </Slick>
        </div>
      </SlickWrapper>
    </Overlay>
  )
};

ImageZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired
};

export default ImageZoom;
