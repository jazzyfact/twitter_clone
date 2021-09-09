import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Header = styled.header`
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

  &button {
    position: absolute;
    right: 0;
    top: 0;
    padding: 15px;
    line-height: 14px;
    cursor: pointer;
  }
`;

export const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #090909;
`;


export const ImgWrapper = styled.div`
  padding: 32px;
  text-align: center;
  
  & img {
    margin: 0 auto;
    max-height: 750px;
  }
`;

export const Indicator = styled.div`
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



const ImagesZoom = ( {images, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0); //현재 페이지를 state에 저장
    return (
        <Overlay>
            <Header>
                <h1>상세 이미지</h1>
                <button onClick={onClose}> X </button>
            </Header>
            <SlickWrapper>
                <div>
                    <Slick 
                        initialSlide={0} //이미지를 0번째 부터 시작
                        afterChange={(slide) => setCurrentsSlide(slide)} //현재슬라이드
                        infinite
                        arrows={false}
                        slidesToShow={1} //한번에 1개만 보이고, 1개만 넘긴다
                        slidesToScroll={1}
                    >
                        {images.map((v) => (
                            <ImgWrapper key ={v.src}>
                                <img src={v.src} alt={v.src}/>
                            </ImgWrapper>
                        ))}
                    </Slick>
                </div>
            </SlickWrapper>
        </Overlay>
            
    );
}


ImagesZoom.propTypes ={
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose : PropTypes.func.isRequired,
};

export default ImagesZoom;