import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import logo from '../../assets/images/tourlogo-bn5.png'

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import t from 'tcomb-form';
import PropTypes from 'prop-types';
import './styles.scss'
import 'bootstrap-social/bootstrap-social.css'
import 'font-awesome/css/font-awesome.min.css'

import * as actionCreators from '../../actions/auth';

import './css/style.css';
import './js/index';
import $ from 'jquery';

const Form = t.form.Form;

//Login from react-facebook took the name Login so renamed to
// Login1
const Login1 = t.struct({
    email: t.String,
    password: t.String
});

const passwordLayout = (locals) => {
  return (

        <TextField
          floatingLabelText="Password"
          type="password"
          fullWidth
          />
  );
};
const emailLayout = (locals) => {
  return (
        <TextField
          floatingLabelText="Email"
          fullWidth
        />
  );
};
const formLayout = (locals) => {
  return (

    <fieldset>
      <div className="form-group">
        {locals.inputs.email}
        <hr className="tm-hr"/>
      </div>
      <div className="form-group">
        {locals.inputs.password}
        <hr className="tm-hr"/>
      </div>
    </fieldset>
  );
};
const LoginFormOptions = {
    auto: 'placeholders',
    help: <i>Hint: a@a.com / qw</i>,
    fields: {
        password: {
            type: 'password',
            attrs: {
              className: 'tm-input'
            }
        },
        email: {
            attrs: {
              className: 'tm-input'
            }
        }
    },
    template: formLayout
};


class LoginView extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        isAuthenticating: PropTypes.bool.isRequired,
        statusText: PropTypes.string,
        actions: PropTypes.shape({
            authLoginUser: PropTypes.func.isRequired,
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


    constructor(props) {
        super(props);

        const redirectRoute = this.props.location ? this.extractRedirect(this.props.location.search) || '/' : '/';
        this.state = {
            formValues: {
                email: '',
                password: ''
            },
            redirectTo: redirectRoute
        };

        this.openRegister = this.openRegister.bind(this);
        this.closeRegister = this.closeRegister.bind(this);

    }

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.dispatch(push('/'));
        }
    }

    componentDidMount() {
    }

    openRegister = () => {
      $('.container').addClass('active');

    }

    closeRegister = () => {
      $('.container').removeClass('active');

    }

    onFormChange = (value) => {
        this.setState({ formValues: value });
    };

    extractRedirect = (string) => {
        const match = string.match(/next=(.*)/);
        return match ? match[1] : '/';
    };

    login = (e) => {
        e.preventDefault();
        var password = $('#pwds').val();
        var username = $('#usrd').val();
        if (username && password) {
            this.props.actions.authLoginUser(username, password, this.state.redirectTo);
        }
    };

    signUp = () => {
      var password = $('#password').val();
      var username = $('#username').val();
      var email = $('#email').val();


      if (username && password && email) {
          this.props.actions.authRegisterUser(email, password, password, username, this.state.redirectTo);

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
                  <div className="pen-title">
<h1><img src="https://i.imgur.com/SAgIP9z.png" /></h1>
</div>
<div className="container">
  {statusText}

<div className="card">
  <h1 className="title">Login</h1>
  <form onSubmit={this.login}>
    <div className="input-container">
      <input type="#{type}" id="usrd" required="required" />
      <label htmlFor="#{label}">Username</label>
      <div className="bar"> </div>
    </div>
    <div className="input-container">
      <input type="password" id="pwds" required="required" />
      <label htmlFor="#{label}">Password</label>
      <div className="bar"> </div>
    </div>
    <div className="button-container">
      <button disabled={this.props.isAuthenticating} type="submit"><span>Go</span></button>
    </div>
    {/*<div className="footer"><a href="#">Forgot your password?</a></div>
    */}
  </form>
</div>
<div className="card alt">
  <a onClick={this.openRegister} className="toggle"> </a>
  <h1 className="title">Register
    <button onClick={this.closeRegister} className="close"> </button>
  </h1>
  <div>
    <div className="input-container">
      <input type="text" id="username" required="required" />
      <label htmlFor="username">Username</label>
      <div className="bar"> </div>
    </div>
    <div className="input-container">
      <input type="email" id="email" required="required" />
      <label htmlFor="email">Email</label>
      <div className="bar"> </div>
    </div>
    <div className="input-container">
      <input type="password" id="password" required="required" />
      <label htmlFor="password">Password</label>
      <div className="bar"> </div>
    </div>
    <div className="button-container">
      <button onClick={this.signUp}><span>Next</span></button>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
export { LoginView as LoginViewNotConnected };
