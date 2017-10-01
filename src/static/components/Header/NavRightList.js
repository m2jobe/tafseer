import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { withRouter } from 'react-router-dom';
import { authLogoutAndRedirect } from '../../actions/auth';

const ImgIconButtonStyle = {
  width: '60px',
  height: '60px'
};

const listItemStyle = {
  paddingLeft: '50px' // 36 + 16, algin with sub list
};

class NavRightList extends React.Component {

  static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      dispatch: PropTypes.func.isRequired,
      location: PropTypes.shape({
          pathname: PropTypes.string
      })
  };

  static defaultProps = {
      location: undefined
  };

  handleChange = (event, value) => {
    this.props.history.push(value);
  }

  logout = () => {
    console.log("hi");
      this.props.dispatch(authLogoutAndRedirect());
  };


  render() {
    return (
      <ul className="list-unstyled float-right">
        <li style={{marginRight: '10px'}}>
          <IconMenu
            iconButtonElement={<IconButton style={ImgIconButtonStyle}><img src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAKNAAAAJDMyNDhhZWYyLWU0NGMtNDZjNS05ODNkLWY5YTAyZjhmODllZg.jpg" alt="" className="rounded-circle img30_30" /></IconButton>}
            onChange={this.handleChange}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            menuStyle={{minWidth: '150px'}}
                    >
            <MenuItem
              value="/app/dashboard"
              primaryText="Dashboard"
              style={{fontSize: '14px', lineHeight: '48px'}}
              innerDivStyle={listItemStyle}
              leftIcon={<i className="material-icons">home</i>}
                        />
            <MenuItem
              value="/app/dashboard/"
              primaryText="My Account"
              innerDivStyle={listItemStyle}
              style={{fontSize: '14px', lineHeight: '48px'}}
              leftIcon={<i className="material-icons">person_outline</i>}
                        />
            <MenuItem
              onClick={this.logout}
              onItemTouchTap={this.logout}
              primaryText="Log "
              innerDivStyle={listItemStyle}
              style={{fontSize: '14px', lineHeight: '48px'}}
              leftIcon={<i className="material-icons">forward</i>}
                        />
          </IconMenu>
        </li>
      </ul>
    );
  }
}

module.exports = withRouter(NavRightList);
