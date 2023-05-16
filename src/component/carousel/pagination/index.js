/** @format */

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Image, View } from 'react-native';
import { useRef, useState } from 'react';
import { data, getScreenWidth } from '../constants';

const PaginationComponent = () => {
	const carouselRef = useRef(null);
	const [entries, setEntries] = useState([]);

	const _renderItem = ({ item, index }) => {
		console.log(item.illustration);

		return (
			<>
				<View
					style={{
						height: '60%',
						width: '100%',
						alignSelf: 'center',
						overflow: 'hidden',
						marginTop: 100,
					}}>
					<Image
						source={{ uri: item.illustration }}
						style={{ height: '100%', width: '100%' }}
						resizeMode='cover'
					/>
				</View>
				{pagination()}
			</>
		);
	};

	const pagination = () => {
		return (
			<Pagination
				dotsLength={data.length}
				activeDotIndex={data.length}
				containerStyle={{ backgroundColor: 'transparent' }}
				dotStyle={{
					width: 20,
					height: 20,
					borderRadius: 20,
					marginHorizontal: 4,

					backgroundColor: 'red',
				}}
				inactiveDotStyle={
					{
						// backgroundColor: 'green',
						// Define styles for inactive dots here
					}
				}
				// inactiveDotOpacity={0.4}
				// inactiveDotScale={0.6}
			/>
		);
	};

	return (
		<Carousel
			ref={carouselRef}
			sliderWidth={getScreenWidth}
			sliderHeight={getScreenWidth}
			itemWidth={getScreenWidth - 60}
			data={data}
			renderItem={_renderItem}
			hasParallaxImages={true}
		/>
	);
};

export { PaginationComponent };
