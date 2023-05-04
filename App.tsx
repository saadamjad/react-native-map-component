/** @format */

import { Dimensions } from 'react-native';

import { MapComponent } from './src/map';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const App = () => {
	return MapComponent();
};
export default App;
