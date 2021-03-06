import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { withRouter } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import '../styles.scss'

const HeaderIconButtonStyle = {
  width: '60px',
  height: '60px'
};

const listItemStyle = {
  paddingLeft: '40px' // 36 + 16, algin with sub list
};

class NavLeftList extends React.Component {

  handleChange = (event, value) => {
    this.props.history.push(value);
  }

  render() {
    return (
      <ul className="list-unstyled list-inline">
        <li className="list-inline-item">
        <a href="/" className="imgLogoAnchor" style={{background: 'transparent', width: 230, display: 'inline-block', paddingLeft: 14, paddingTop: 14}}>
          <img id="imgLogo" src="http://tafseer.nfshost.com/dist/img/QuranLogo.png" />
        </a>
        </li>
      </ul>
    );
  }
}

module.exports = withRouter(NavLeftList);
