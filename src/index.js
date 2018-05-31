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
import AuthComponent from './components/AuthorizationComponents/AuthComponent'
import PersonalHomePage from './components/MainMenuComponents/PersonalHomeComponent'
import Model3dExp from './components/3d-components/Model3d_Exp'

import registerServiceWorker from './registerServiceWorker'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(reduxThunk)))

render(
	<Provider store={store}>
      <Router> 
        <Switch>
          <Route exact path="/" component={AuthComponent} />
          <Route path="/book" component={App} /> {/*this is my container*/}
          <Route path="/main-personal-page" component={PersonalHomePage} />
          <Route path="/experiment3d" component={Model3dExp} />
        </Switch>  
      </Router>
  	</Provider>,
    
	document.getElementById('root')

)

registerServiceWorker()
