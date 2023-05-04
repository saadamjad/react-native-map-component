/** @format */

import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Context } from '../context';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GetApiCall } from '../utils/apiCall';
import { getCurrentLocation } from '../utils/getcurrentLocation';
import { Loader } from '../utils/loader';
import { PlaceInput } from '../utils/placeInput';
const googleMapKey = 'AIzaSyAEl91Vndp067MG7IhjWYgjrPF5IMW4_88';

const MapComponent = () => {
	let mapRef = useRef('');
	const [loader, setLoader] = useState(false);
	const [drag, setDrag] = useState(false);
	const [context, setContext] = useContext(Context);
	getCurrentLocation();

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

		const { latitude, longitude } = value;

		GetApiCall(value).then((res) => {
			setLocations({
				...locations,
				locations: {
					...locations?.locations,
					latitude: latitude,
					longitude: longitude,
				},
				...res,
			});
			setLoader(false);
		});
	};

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
	useEffect(() => {
		if (context) {
			setLocations({
				...locations,
				locations: context,
			});
			mapRef.current.animateToRegion(context, 4000);
		}
	}, [context]);
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
	const renderLoader = useCallback(() => {
		if (loader) return <Loader loading={loader} />;
		return null;
	}, [loader]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{renderMapComponent()}
			{renderLoader()}
		</SafeAreaView>
	);
};
export { MapComponent };
