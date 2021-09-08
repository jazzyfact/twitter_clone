import React from 'react';
import PropTyeps from 'prop-types';
import Slick from 'react-slick';

const ImagesZoom = ( {images, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0); //현재 페이지를 state에 저장
    return (
        <div>
            <header>
                <h1>상세 이미지</h1>
                <button onClick={onClose}> X </button>
            </header>
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
                        <div key ={x.src}>
                            <img src={v.src} alt={v.src}/>
                        </div>
                    ))}
                </Slick>
            </div>
        </div>
            
    );
}


ImagesZoom.propTypes ={
    images: propTypes.arrayOf(propTypes.object).isRequired,
    onClose : PorpTypes.func.isRequired,
};

export default ImagesZoom;