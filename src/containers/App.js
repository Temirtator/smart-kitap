import React, { Component } from 'react'
//import logo from './logo.svg'
import '../resources/styles/css/App.css'
import Ereader from '../components/e_readerComponent'
import 'bootstrap/dist/css/bootstrap.css'
import '../resources/styles/font-awesome/svg-with-js/js/fontawesome-all.js'

//const Fragment = React.Fragment;
class App extends Component {
	
	componentWillMount() {

	}

	

    render() {
	    return (
	      <div>
	        <Ereader />
	      </div>
	    );
	}
}


export default App;
