/** @format */

import { useContext, useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Context } from '../../context';

const getCurrentLocation = async () => {
	const [context, setContext] = useContext(Context);

	const location = () => {
		Geolocation.getCurrentPosition(
			(position) => {
				let region = {
					latitude: parseFloat(position.coords.latitude),
					longitude: parseFloat(position.coords.longitude),
					latitudeDelta: 0.0001,
					longitudeDelta: 0.1,
				};

				setContext(region);
			},
			(error) => console.log(error),
			{
				enableHighAccuracy: true,
				timeout: 50000,
				maximumAge: 1000,
			}
		);
	};

	useEffect(() => {
		location();
	}, []);
	return null;
};

export { getCurrentLocation };
