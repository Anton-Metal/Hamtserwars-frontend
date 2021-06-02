import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route  } from 'react-router-dom'

import Battle from './components/battle/Battle';
import Gallery from './components/gallery/Gallery';
import Start from './components/start/Start';
import './App.css';
// import { HamsterItem } from './types/HamsterItem';

// const hamsterData: HamsterItem[] = []


function App() {
  return (
	<Router>
    <div className="App">
    	<header className="App-header">
		  <nav>
			  <Link to="/"> Start </Link>
			  <Link to="/battle"> Tävla </Link>
			  <Link to="/gallery"> Galleri </Link>
		  </nav>
       
     	</header>
		<main>
			<Switch>
				<Route path="/battle"> <Battle /> </Route>				
				<Route path="/gallery"> <Gallery /> </Route>
				<Route path="/"> <Start /> </Route>
			</Switch>
		</main>


    </div>
	</Router>
  );
}

export default App;


