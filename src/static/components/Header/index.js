import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import APPCONFIG from 'constants/Config';
import NavLeftList from './NavLeftList';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { authLogoutAndRedirect } from '../../actions/auth';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import UserAvatar from 'react-user-avatar';
import * as actionCreators from '../../actions/data';

const ImgIconButtonStyle = {
  width: '60px',
  height: '60px'
};

const listItemStyle = {
  paddingLeft: '50px' // 36 + 16, algin with sub list
};

class Header extends React.Component {

  static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      dispatch: PropTypes.func.isRequired,
      location: PropTypes.shape({
          pathname: PropTypes.string
      })
  };

  static defaultProps = {
      location: undefined,
      userName:null,
      token:null,
      fbImage:null
  };
  handleChange = (event, value) => {
    this.props.history.push(value);
  }
  logout = () => {
      this.props.dispatch(authLogoutAndRedirect());
  };

  componentDidMount() {
    const sidebarToggler = this.sidebarBtn;
    const $sidebarToggler = $(sidebarToggler);
    const $body = $('#body');

    $sidebarToggler.on('click', (e) => {
      // _sidebar.scss, _page-container.scss
      $body.toggleClass('sidebar-mobile-open');
    });
  }

  login = () => {
    this.props.dispatch(push('/login'));
  }

  render() {
    const { isFixedHeader, colorOption } = this.props;

    return (
      <section className="app-header">
        <div
          className={classnames('app-header-inner', {
            'bg-color-light': ['11', '12', '13', '14', '15', '16', '21'].indexOf(colorOption) >= 0,
            'bg-color-dark': colorOption === '31',
            'bg-color-primary': ['22', '32'].indexOf(colorOption) >= 0,
            'bg-color-success': ['23', '33'].indexOf(colorOption) >= 0,
            'bg-color-info': ['24', '34'].indexOf(colorOption) >= 0,
            'bg-color-warning': ['25', '35'].indexOf(colorOption) >= 0,
            'bg-color-danger': ['26', '36'].indexOf(colorOption) >= 0 })}
                >
          <div className="d-lg-none d-xl-none float-left">
            <a href="javascript:;" className="md-button header-icon toggle-sidebar-btn" ref={(c) => { this.sidebarBtn = c; }}>
              <i className="material-icons">menu</i>
            </a>
          </div>

          {/*<div className="brand d-none d-lg-inline-block d-xl-inline-block">
            <h2><Link to="/" style={{fontSize: '23.5px'}}>{APPCONFIG.brand}</Link></h2>
          </div>*/}

          <div className="top-nav-left d-none d-lg-inline-block d-xl-inline-block">
            <NavLeftList />
          </div>

          <div className="top-nav-right">
            <ul className="list-unstyled float-right">

            </ul>
          </div>
        </div>
      </section>
    );
  }
}


const mapStateToProps = state => ({
  colorOption: state.settings.colorOption,
  isFixedHeader: state.settings.isFixedHeader,
  isAuthenticated: state.auth.isAuthenticated,
  location: state.routing.location,
  userName: state.auth.userName,
  token: state.auth.token,
  fbImage: state.auth.fbImage

});


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
export { Header as HeaderNotConnected };
