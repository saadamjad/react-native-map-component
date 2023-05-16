/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Images, getScreenHeigh, getScreenWidth, layouts } from '../constants';

const CustomInterPolation = () => {
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

	const autoPlaySliderHandler = () => {
		setState({ ...state, autoPlay: true });
	};

	useEffect(() => {
		setTimeout(() => {
			autoPlaySliderHandler();
		}, 2000);
	}, []);
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'black',
				opacity: 0.9,
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<View
				style={{
					borderRadius: 10,
					height: getScreenHeigh - 350,
					width: getScreenWidth - 20,
					alignItems: 'center',
					borderWidth: 1,
					overflow: 'hidden',
				}}>
				<Carousel
					ref={sliderRef}
					layout={layouts.default}
					containerCustomStyle={{
						flex: 1,
					}}
					contentContainerCustomStyle={{
						flexGrow: 1,
					}}
					data={Images}
					activeSlideOffset={0}
					renderItem={_renderItem}
					sliderWidth={getScreenWidth}
					itemWidth={getScreenWidth}
					enableMomentum={false}
					// lockScrollWhileSnapping={true}
					// firstItem={2}
					scrollEnabled={true}
					useScrollView={true}
					// vertical={true}
					// hasParallaxImages={true}
					sliderHeight={getScreenHeigh}
					itemHeight={getScreenHeigh}
					loopClonesPerSide={3}
					autoplay={autoPlay}
					// startAutoplay={true}
					loop={true}
					// autoplayDelay={3000}
					apparitionDelay={20}
					// autoplayInterval={3000}
					// inactiveSlideOpacity={0.5}
				/>
			</View>
		</View>
	);
};

export { CustomInterPolation };
