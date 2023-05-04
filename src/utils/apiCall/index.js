/** @format */

import { Dimensions } from 'react-native';

import axios from 'react-native-axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const googleMapKey = 'AIzaSyAEl91Vndp067MG7IhjWYgjrPF5IMW4_88';
const GetApiCall = (value) => {
	const { latitude, longitude, latitudeDelta, longitudeDelta } = value;
	console.log(latitude, longitude, latitudeDelta, longitudeDelta);
	const queryParam = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=${googleMapKey}`;
	return axios
		.get(queryParam)
		.then((response) => {
			const splittedValue =
				response?.data?.results[0]?.formatted_address?.split(',');
			const placeName = splittedValue[0];
			const placeDescription = splittedValue[1] + ' ' + splittedValue[2];
			const data = {
				placeName,
				placeDescription,
			};

			return data;
		})
		.catch((err) => {
			console.log({ err });
		});

	return null;
};
export { GetApiCall };
