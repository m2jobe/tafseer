import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import APPCONFIG from 'constants/Config';
import {
    toggleCollapsedNav
} from '../../actions';
import SidenavContent from './SidenavContent';
import navLogo from '../../assets/images/tourlogo.png'
import '../styles.scss'
import PropTypes from 'prop-types';

const customStyles = {
    marginTop                   : '0vh'
};

class Sidebar extends React.Component {


    constructor(props) {
        super(props);

        let focusedInput = null;

        this.state = {
          enableNotificationCallback: false,
          surahOptions: null,
          ayatOptions: null,
          currentSurah:null,
          currentAyat:null,
          sideBarStyle:null
        };
        //this.initTranslationArea = this.initTranslationArea.bind(this);

        //this.prepareTranslationArea = this.prepareTranslationArea.bind(this);
    }


  componentDidMount() {
    // AutoCloseMobileNav
    const { history,location } = this.props;
    const $body = $('#body');
    console.log("sidebar loc " +location.pathname)

    if (APPCONFIG.AutoCloseMobileNav) {
      history.listen((location) => {
        setTimeout(() => {
          $body.removeClass('sidebar-mobile-open');
        }, 0);
      });
    }
    if(this.props.location.pathname.indexOf("content") >= 0) {
      var contentStyle = {
          marginTop : '17vh'
      };
      this.setState({sideBarStyle: contentStyle})
    } else {
      var contentStyle = {
          marginTop : '0vh'
      };
      this.setState({sideBarStyle: contentStyle})
    }

  }

  componentDidUpdate(prevState,prevProps) {
    if(prevState.sideBarStyle != null ){
    if(this.state.sideBarStyle != prevState.sideBarStyle) {
        if(this.props.location.pathname.indexOf("content") >= 0) {
          var contentStyle = {
              marginTop : '17vh'
          };
        } else {
          var contentStyle = {
              marginTop : '0vh'
          };
        }
        this.setState({sideBarStyle: contentStyle})
    }
    }
  }

  onToggleCollapsedNav = (e) => {
    const val = !this.props.navCollapsed;
    const { handleToggleCollapsedNav } = this.props;
    handleToggleCollapsedNav(val);
  }

  shouldComponentUpdate() {
    return true;
  }
  render() {
    const { navCollapsed, colorOption, location } = this.props;
    let toggleIcon = null;
    if (navCollapsed) {
      toggleIcon = <i className="material-icons">menu</i>;
    } else {
      toggleIcon = <i className="material-icons">close</i>;
    }

    return (
      <nav style={this.state.sideBarStyle}
          className={classnames('app-sidebar', {
          'bg-color-light': ['31', '32', '33', '34', '35', '36'].indexOf(colorOption) >= 0,
          'bg-color-dark': ['31', '32', '33', '34', '35', '36'].indexOf(colorOption) < 0 })}
            >
        <section
          className={classnames('sidebar-header', {
            'bg-color-dark': ['11', '31'].indexOf(colorOption) >= 0,
            'bg-color-light': colorOption === '21',
            'bg-color-primary': ['12', '22', '32'].indexOf(colorOption) >= 0,
            'bg-color-success': ['13', '23', '33'].indexOf(colorOption) >= 0,
            'bg-color-info': ['14', '24', '34'].indexOf(colorOption) >= 0,
            'bg-color-warning': ['15', '25', '35'].indexOf(colorOption) >= 0,
            'bg-color-danger': ['16', '26', '36'].indexOf(colorOption) >= 0 })}
                >

                <a href="javascript:;" className="logo-img logo-react" onClick={this.onToggleCollapsedNav}>
                  {toggleIcon}
                </a>
          <Link to="/" className="brand">{APPCONFIG.brand}</Link>

        </section>

        <section className="sidebar-content">
          <SidenavContent />
        </section>

        <section className="sidebar-footer">

        </section>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  navCollapsed: state.settings.navCollapsed,
  colorOption: state.settings.colorOption
});

const mapDispatchToProps = dispatch => ({
  handleToggleCollapsedNav: (isNavCollapsed) => {
    dispatch(toggleCollapsedNav(isNavCollapsed));
  },
});

module.exports = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar));
