import React from 'react';
import APPCONFIG from 'constants/Config';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../actions/auth';
import classNames from 'classnames';

class PageSignUp extends React.Component {

  static propTypes = {
      dispatch: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool.isRequired,
      isAuthenticating: PropTypes.bool.isRequired,
      statusText: PropTypes.string,
      actions: PropTypes.shape({
          authRegisterUser: PropTypes.func.isRequired
      }).isRequired,
      location: PropTypes.shape({
          search: PropTypes.string.isRequired
      })
  };

  static defaultProps = {
      statusText: '',
      location: null
  };

  extractRedirect = (string) => {
      const match = string.match(/next=(.*)/);
      return match ? match[1] : '/';
  };


  componentWillMount() {
      if (this.props.isAuthenticated) {
          this.props.dispatch(push('/'));
      }
  }

  constructor(props) {
    super(props);
    const redirectRoute = this.props.location ? this.extractRedirect(this.props.location.search) || '/' : '/';

    this.state = {
      brand: APPCONFIG.brand,
      redirectTo: redirectRoute

    };
  }

  signUp = () => {
    var email = $('#email').val();
    var password = $('#password').val();
    var username = $('#username').val();
    var password1 = $('#password2').val();


    if (email) {
        console.log("SENT ON IF STATEMENT")
        this.props.actions.authRegisterUser(email, password, password1, username, this.state.redirectTo);
    }
  }

  render() {
    let statusText = null;
    if (this.props.statusText) {
        const statusTextClassNames = classNames({
            'alert': true,
            'alert-danger': this.props.statusText.indexOf('Authentication Error') === 0,
            'alert-success': this.props.statusText.indexOf('Authentication Error') !== 0
        });

        statusText = (
            <div className="row">
                <div className="col-sm-12">
                    <div className={statusTextClassNames}>
                        {this.props.statusText}
                    </div>
                </div>
            </div>
        );
    }

    return (
<div className="page-login">
  <div className="main-body">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1">
        {statusText}

      <div className="body-inner">

        <div className="card bg-white">
          <div className="card-content">
            <section className="logo text-center">
              <h1><a href="#/">{this.state.brand}</a></h1>
            </section>

            <form className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Username"
                    type="text"
                    fullWidth
                    id="username"
                  />
                </div>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Email"
                    type="email"
                    fullWidth
                    id="email"
                  />
                </div>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Password"
                    type="password"
                    fullWidth
                    id="password"
                  />
                </div>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Retype Password"
                    type="password"
                    fullWidth
                    id="password2"
                  />
                </div>
                <div className="divider" />
                <div className="form-group">
                  <p className="text-small">By clickinaddfasdfag on sign up, you agree to <a href="javascript:;"><i>terms</i></a> and <a href="javascript:;"><i>privacy policy</i></a></p>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="card-action no-border text-right">
            <a href="#/login" className="color-gray-light">Login</a>
            <a onClick={this.signUp} className="color-primary">Sign Up</a>
          </div>
        </div>

      </div>

    </div>
  </QueueAnim>
</div>
</div>
    );
  }
}



const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageSignUp);
export { PageSignUp as PageSignUpNotConnected };
