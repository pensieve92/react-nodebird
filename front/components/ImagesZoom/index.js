import React, { useState } from 'react';
import Slick from 'react-slick';
import PropTypes from 'prop-types';
import {Overlay, Header, CloseButton, SlickWrapper, Global, ImgWrapper, Indicator } from './styles'
import { backUrl } from '../../config/config';



const ImagesZoom = ({ images, onClose}) => {
    const [currentSlide, setCurrentSlide]= useState(0);

    return (
        <Overlay>
            <Header>
                <h1>상세이미지</h1>
                <CloseButton onClick={onClose}>X</CloseButton>
            </Header>
            <SlickWrapper>
                <Global />
                <div>
                    <Slick
                        initialSlide={0}
                        // afterChange={(slide)=> setCurrentSlide(slide)}
                        beforeChange={(slide)=> setCurrentSlide(slide)}
                        infinite
                        arrows={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {images.map((v) => (
                            <ImgWrapper key={v.src}>
                                <img src={`${backUrl}/${v.src}`} alt={v.alt} />
                            </ImgWrapper>
                        ))}
                    </Slick>
                    <Indicator>
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
    )
}

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired , 
    onClose: PropTypes.func.isRequired

}
export default ImagesZoom;