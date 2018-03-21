import React, { Component } from 'react'
import { connect } from 'react-redux'

class About extends Component {
    constructor(props) {
        super(props)

        this.state = {
            access_token: window.localStorage.getItem('access_token')
        }
        this.checkAuth = this.checkAuth.bind(this)
    }

    checkAuth() {
        if (!this.state.access_token) {
            this.props.history.push('/')
        }
    }
    
    componentWillMount() {
        this.checkAuth()
    }
    
    render() {
        let { blindMode, theme_settings } = this.props.appStateControl
        let img = './image/logo_blue.png'
        if (blindMode || (theme_settings.isTurnOn && (theme_settings.theme === 1))) {
            img = './image/logo_white.png'
        }

        return (
            <div className="about-component">
            	<div className="container">
            		<div className="row about-component__header">
            			<div className="logo__wrap">
            				<img src={img} alt="logo" />
            			</div>
            			{/*<h1>Smart Kitap</h1>*/}
            		</div>
            		<div className="row about-component__body">
            			<h3>
            				Lorem ipsum dolor sit amet. Quod maxime placeat, facere possimus, omnis voluptas. Dolores eos, qui ab illo. Nihil molestiae consequatur, vel illum, qui officiis debitis. Reiciendis voluptatibus maiores alias consequatur aut fugit. Asperiores repellat. nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut. Suscipit laboriosam, nisi ut perspiciatis, unde omnis dolor repellendus. Ad minima veniam, quis nostrum exercitationem ullam corporis. In ea commodi autem quibusdam et dolore magnam aliquam quaerat voluptatem.
            			</h3>
            			<p>
            				Doloribus asperiores repellat. vel eum iure reprehenderit, qui blanditiis praesentium voluptatum. Enim ipsam voluptatem, quia consequuntur magni dolores et voluptates repudiandae sint. Impedit, quo voluptas sit, aspernatur aut perferendis. Minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi. Consequatur, vel eum iure reprehenderit, qui ab illo. Nam libero tempore, cum soluta nobis est laborum et molestiae consequatur.
            			</p>
            			<p>
            				Hic tenetur a sapiente delectus, ut enim. Id est laborum et molestiae. Quasi architecto beatae vitae dicta sunt, explicabo sapiente delectus, ut perspiciatis. Assumenda est, omnis dolor sit, aspernatur aut officiis debitis aut perferendis doloribus. Est, omnis voluptas nulla vero. Aliquid ex ea voluptate velit esse. Odit aut rerum hic tenetur a sapiente delectus, ut. Dolores eos, qui maiores alias consequatur aut rerum.
            			</p>
            			<p>
            				Hic tenetur a sapiente delectus. Nobis est laborum et expedita. Neque porro quisquam est, qui in ea commodi autem. Officiis debitis aut reiciendis voluptatibus maiores alias. Voluptatibus maiores alias consequatur aut reiciendis. Est, qui dolorem ipsum, quia dolor repellendus maxime placeat, facere possimus omnis. Laboriosam, nisi ut labore et iusto odio dignissimos ducimus, qui. Voluptas sit, aspernatur aut rerum hic tenetur a sapiente delectus, ut.
            			</p>
            		</div>
            	</div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
   appStateControl: state.appStateControl
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About)
