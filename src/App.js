import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';

function App() {
	return (
		<Router>
			<Navigation />
			<div className='container'>
				<Route path='/' exact component={NotesList} />
				<Route path='/edit/:id' component={CreateNote} />
				<Route path='/create' component={CreateNote} />
				<Route path='/user' component={CreateUser} />
			</div>
		</Router>
	);
}

export default App;
