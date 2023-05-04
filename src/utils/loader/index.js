/** @format */

import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Loader = (loading) => {
	if (loading) {
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

export { Loader };
