import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { Tab, Tabs, TabList, TabPanel} from 'react-tabs'

import NewPrecises from './NewPrecisesComponent'
import OldPrecises from './OldPrecisesComponent'
import * as languages from '../../resources/language/languages.json'
import * as checkConnectivity from '../../actions/checkConnectivity'

class PrecisComponent extends Component {
    
    componentWillMount() {
        this.props.checkConnectivity.onlineCheck().then((response) => {
        })
        .catch((error) => {
            alert('Интернет не работает. Пожалуйста проверьте ваше соединение - new precises')
        })
    }
    
    render() {
        let { language } = this.props.appStateControlState.user_settings
        let choosenLang = languages[0][language]
        
        return (
            <div className="precis-component">
            	<Tabs>
                    <div className="react__tablist__wrap">
                        <TabList>
                            <Tab>{choosenLang['new-precises']}</Tab>
                            <Tab>{choosenLang['old-precises']}</Tab>
                        </TabList>
                    </div>
                    
                    <TabPanel>
                        <NewPrecises />
                    </TabPanel>
                    
                    <TabPanel>
                        <OldPrecises />
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => ({
   precisesStore: state.precis,
   appStateControlState: state.appStateControl
})

const mapDispatchToProps = dispatch => ({
    checkConnectivity: bindActionCreators(checkConnectivity, dispatch)
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PrecisComponent))
