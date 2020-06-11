import React from 'react';
import './App.less';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/router';

import { createStore } from 'redux'
import appStore from './reducers'
import { Provider } from 'react-redux'

let store = createStore(appStore)

function App() {
	return (
			<Provider store={store}>
				<BrowserRouter>
					<Router></Router>
				</BrowserRouter>
			</Provider>
	);
}

export default App;
