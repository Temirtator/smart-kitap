import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import './resources/styles/css/index.css'

import App from './containers/App'
import TestComponent from './components/TestComponent'
import VideoComponent from './components/VideoComponent'
import InstrumentComponent from './components/InstrumentComponent'
import PrecisComponent from './components/PrecisComponent'
import AuthComponent from './components/AuthComponent'
import PersonalHomePage from './components/PersonalHomeComponent'
import MyBooksProgress from './components/MyBooksProgressComponent'
import Model3dExp from './components/Model3d_Exp'

import registerServiceWorker from './registerServiceWorker'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(reduxThunk)))

render(

	<Provider store={store}>
      <Router> 
        <Switch>
          <Route exact path="/" component={AuthComponent} />
          <Route path="/test" component={TestComponent} />
          <Route path="/video" component={VideoComponent} />
          <Route path="/instruments" component={InstrumentComponent} />
          <Route path="/precis" component={PrecisComponent} />
          <Route path="/book" component={App} /> {/*this is my container*/}
          <Route path="/main-personal-page" component={PersonalHomePage} />
          <Route path="/my-books" component={MyBooksProgress} />
          <Route path="/experiment3d" component={Model3dExp} />
        </Switch>  
      </Router>
  	</Provider>,
    
	document.getElementById('root')

);

registerServiceWorker();
