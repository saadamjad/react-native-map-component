/** @format */

import React, { useEffect, useRef, useState } from 'react';
import {
	View,
	Dimensions,
	SafeAreaView,
	ActivityIndicator,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'react-native-axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const googleMapKey = 'AIzaSyAEl91Vndp067MG7IhjWYgjrPF5IMW4_88';
const MapComponent = () => {
	let mapRef = useRef('');
	const [loader, setLoader] = useState(false);
	const [drag, setDrag] = useState(false);

	const [locations, setLocations] = useState({
		locations: {
			latitude: 25.0215,
			longitude: 67.3034,
			latitudeDelta: 3,
			longitudeDelta: 3,
		},
		placeName: '',
		placeDescription: '',
	});

	const getLocationsName = async (value) => {
		setLoader(true);

		const { latitude, longitude, latitudeDelta, longitudeDelta } = value;
		console.log(latitude, longitude, latitudeDelta, longitudeDelta);
		const queryParam = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=${googleMapKey}`;
		axios
			.get(queryParam)
			.then((response) => {
				setLoader(false);
				const splittedValue =
					response?.data?.results[0]?.formatted_address?.split(',');

				const placeName = splittedValue[0];
				const placeDescription = splittedValue[1] + ' ' + splittedValue[2];
				setLocations({
					...locations,
					locations: {
						...locations?.locations,
						latitude: latitude,
						longitude: longitude,
					},
					placeName: placeName,
					placeDescription: placeDescription,
				});
			})
			.catch((err) => {
				console.log({ err });
				setLoader(false);
			});
	};
	const getCurrentLocation = async () => {
		Geolocation.getCurrentPosition(
			(position) => {
				let region = {
					latitude: parseFloat(position.coords.latitude),
					longitude: parseFloat(position.coords.longitude),
					latitudeDelta: 0.0001,
					longitudeDelta: 0.1,
				};

				mapRef.current.animateToRegion(region, 3000);
				getLocationsName(region);
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
		getCurrentLocation();
	}, []);

	const renderMapComponent = () => {
		if (mapRef)
			return (
				<View
					style={{
						shadowColor: '#000',
						borderColor: 'gray',
					}}>
					<MapView
						zoomEnabled={true}
						followUserLocation={true}
						showsUserLocation={true}
						showsTraffic={true}
						onMapReady={() => console.log('')}
						initialRegion={locations.locations}
						userLocationAnnotationTitle={'true'}
						provider={PROVIDER_GOOGLE}
						userLocationCalloutEnabled={true}
						ref={mapRef}
						style={{
							borderColor: 'gray',
							width: '100%',
							height: '100%',
						}}>
						<Marker
							draggable={true}
							coordinate={locations.locations}
							title={locations.placeName}
							description={locations.placeDescription}
							onDragEnd={(e) => {
								setDrag(true);
								const obj = {
									...e.nativeEvent.coordinate,
									latitudeDelta: 0.0001,
									longitudeDelta: 0.1,
								};
								getLocationsName(obj);
							}}
						/>

						{GooglePlacesInput()}
					</MapView>
				</View>
			);

		return null;
	};
	const GooglePlacesInput = () => {
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
					console.log('=========', locationObj);
					getLocationsName(locationObj);

					mapRef.current.animateToRegion(locationObj, 4000);
				}}
				query={{
					key: googleMapKey,
					language: 'en',
					components: 'country:pk',
				}}
			/>
		);
	};

	const renderLoader = () => {
		if (loader) {
			return (
				<View
					style={{
						width: '90%',
						alignSelf: 'center',
						height: 100,
						position: 'absolute',
						bottom: 20,
						alignSelf: 'center',
						justifyContent: 'center',
					}}>
					<ActivityIndicator
						size='large'
						color='green'
					/>
				</View>
			);
		}
		return null;
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			{renderMapComponent()}
			{renderLoader()}
		</SafeAreaView>
	);
};
export { MapComponent };
