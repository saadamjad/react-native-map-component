/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
	Images,
	getScreenHeigh,
	getScreenWidth,
	layouts,
	types,
} from '../constants';
import { NormalSlider } from '../normalSlider';
import { PaginationComponent } from '../pagination';
import { ParallelaxImage } from '../parallelaxImage';
import { CustomInterPolation } from '../customInterpolations';

const RenderSlider = ({ layoutType }) => {
	const sliderRef = useRef();
	const [state, setState] = useState({
		autoPlay: false,
	});
	const { autoPlay } = state;
	_renderItem = (item) => {
		return (
			<View
				style={{
					height: '100%',
					width: '80%',
					alignSelf: 'center',
				}}>
				<Image
					source={item.item.image}
					style={{ height: '100%', width: '100%' }}
					resizeMode='contain'
				/>
			</View>
		);
	};

	const renderComponent = () => {
		switch (layoutType) {
			case types.normalSlider:
				return <NormalSlider />;
			case types.Pagination:
				return <PaginationComponent />;
			case types.ParallaxImage:
				return <ParallelaxImage />;
			case types.CustomInterpolations:
				return <CustomInterPolation />;
			default:
				return (
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							flex: 1,
						}}>
						<Text
							style={{
								fontSize: 20,
							}}>
							Please Call Slider Type
						</Text>
					</View>
				);
		}
	};
	return renderComponent();
};

export { RenderSlider };
