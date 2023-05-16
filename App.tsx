/** @format */


import { MapComponent } from './src/map';
import { useState } from 'react';

import { Context } from './src/context';
import { SliderComponent } from './src/component/carousel';
const App = () => {
	const [context, setContext] = useState({});

	return (
		<Context.Provider value={[context, setContext]}>
			<SliderComponent />
		</Context.Provider>
	);
};
export default App;
