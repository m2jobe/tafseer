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

const Form = t.form.Form;

const Login = t.struct({
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
            authLoginUser: PropTypes.func.isRequired
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
    }

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.dispatch(push('/'));
        }
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
        const value = this.loginForm.getValue();
        if (value) {
            this.props.actions.authLoginUser(value.email, value.password, this.state.redirectTo);
        }
    };

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

                        <section className="tm-logo-text logo text-center">
                          <h1><a href="#/"><img className="tm-logo" src={logo} /></a></h1>
                        </section>

                        <form className="form-horizontal" onSubmit={this.login}>
                            <Form ref={(ref) => { this.loginForm = ref; }}
                                type={Login}
                                options={LoginFormOptions}
                                value={this.state.formValues}
                                onChange={this.onFormChange}
                            />

                          <div style={{float:'right'}}>
                          <button disabled={this.props.isAuthenticating}
                              type="submit" style={{background: 'transparent'}} className="color-primary card-action no-border text-right">
                            Login
                          </button>
                          </div>
                          <br/><br/><br/>
                          <div style={{marginBottom:'2vh', color: 'white'}}>
                          <a  style={{width:'100%'}}  className="btn btn-block btn-social btn-facebook">
                            <span className="fa fa-facebook"></span> Sign in with Facebook
                          </a>
                          </div>
                          <div style={{marginBottom:'2vh', color: 'white'}}>
                            <a  style={{width:'100%'}}  className="btn btn-block btn-social btn-google">
                              <span className="fa fa-google"></span> Sign in with Google

                            </a>

                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="additional-info">
                      <a href="#/sign-up">Sign up</a>
                      <span className="divider-h" />
                      <a href="#/forgot-password">Forgot your password?</a>
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
