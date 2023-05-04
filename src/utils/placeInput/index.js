/** @format */

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

const googleMapKey = 'AIzaSyAEl91Vndp067MG7IhjWYgjrPF5IMW4_88';

const PlaceInput = () => {
	const ref = useRef();
	return (
		<GooglePlacesAutocomplete
			ref={ref}
			fetchDetails={true}
			placeholder={
				drag
					? locations?.placeName + ', ' + locations?.placeDescription
					: ' Enter Location'
			}
			textInputProps={{
				placeholderTextColor: 'white',
			}}
			styles={{
				textInput: {
					width: '90%',
					alignSelf: 'center',
					borderWidth: 1,
					borderRadius: 20,
					borderColor: 'white',
					backgroundColor: '#8294C4',
				},
			}}
			onPress={(data, details = null) => {
				const coordinates_ = details?.geometry?.location;

				const locationObj = {
					latitude: coordinates_.lat,
					longitude: coordinates_.lng,
					latitudeDelta: 0.0001,
					longitudeDelta: 0.1,
				};
				return locationObj;
				// getLocationsName(locationObj);
				// mapRef.current.animateToRegion(locationObj, 4000);
			}}
			query={{
				key: googleMapKey,
				language: 'en',
				components: 'country:pk',
			}}
		/>
	);
};

export { PlaceInput };
