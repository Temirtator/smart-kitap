import React, { Component } from 'react'
import '../resources/styles/css/App.css'
import Ereader from '../components/GeneralComponents/e_readerComponent'
import 'bootstrap/dist/css/bootstrap.css'
import '../resources/styles/font-awesome/svg-with-js/js/fontawesome-all.js'

class App extends Component {
	render() {
	    return (
	      <div>
	        <Ereader />
	      </div>
	    );
	}
}
export default App
