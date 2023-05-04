/** @format */


import { MapComponent } from './src/map';
import { useState } from 'react';

import { Context } from './src/context';
const App = () => {
	const [context, setContext] = useState({});

	return (
		<Context.Provider value={[context, setContext]}>
			<MapComponent />
		</Context.Provider>
	);
};
export default App;
