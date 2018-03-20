import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import ReadedBooks from '../ProgressComponents/ReadedBooksComponent'
import IReadBooks from '../ProgressComponents/IReadBooksComponent'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as languages from '../../resources/language/languages.json'

class TestsTab extends Component {
    render() {
    	let { language } = this.props.appStateControl.user_settings
    	let choosenLang = languages[0][language]
        return (
     		<Tabs>
				<div className="my-books__tab-test">
					<TabList>
						<Tab>{choosenLang['readed']}</Tab>
						<Tab>{choosenLang['i-read']}</Tab>
					</TabList>
				</div>
				<TabPanel>
					<ReadedBooks />
				</TabPanel>
				
				<TabPanel>
					<IReadBooks />
				</TabPanel>
			</Tabs>
        )
    }
}

const mapStateToProps = state => ({
   appStateControl: state.appStateControl
})

const mapDispatchToProps = dispatch => ({
   //actions: bindActionCreators(precis_action, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestsTab)
