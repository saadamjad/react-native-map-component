/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { types } from './constants';
import { RenderSlider } from './commonslider';

const SliderComponent = () => {
	const sliderRef = useRef();

	return (
		<RenderSlider
			ref={sliderRef}
			layoutType={types.Carousel}
		/>
	);
};

export { SliderComponent };
