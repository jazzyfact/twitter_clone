import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';

import {Overlay, Global, Header, CloseBtn, ImgWrapper, Indicator, SlickWrapper } from './styles';



const ImagesZoom = ( {images, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0); //현재 페이지를 state에 저장

    return (
        <Overlay>
          <Global/>
            <Header>
                <h1>상세 이미지</h1>
                <CloseBtn  onClick={onClose}> X </CloseBtn>
            </Header>
            <SlickWrapper>
                <div>
                    <Slick 
                        initialSlide={0} //이미지를 0번째 부터 시작
                        afterChange={(slide) => setCurrentSlide(slide)} //현재슬라이드
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
                    <Indicator>
                      {/* 현재 몇번째 슬라이더를 보고 있는지 */}
                      <div>
                        {currentSlide + 1}
                        {' '}
                        /
                        {images.length}
                      </div>
                    </Indicator>
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