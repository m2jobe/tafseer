import React from 'react';
import QueueAnim from 'rc-queue-anim';
import classnames from 'classnames';
import './styles.scss'
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as actionCreators from '../../../../actions/data';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Modal from 'react-modal';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width:                '50vh'
  }
};


const iconButtonElement = (
  <IconButton
    touch
    tooltip="more"
    tooltipPosition="bottom-left"
    >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

class Events extends React.Component {
  static propTypes = {
      dispatch: PropTypes.func.isRequired,
      isFetching: PropTypes.bool.isRequired,
      data: PropTypes.string,
      token: PropTypes.string.isRequired,
      actions: PropTypes.shape({
          dataFetchProtectedData: PropTypes.func.isRequired,
          fetchEventsSubscribedTo: PropTypes.func.isRequired,
          unSubSelectedEvent:  PropTypes.func.isRequired,

      }).isRequired,
  };

  static defaultProps = {
    userName: null,
  };


  constructor(props) {
      super(props);

      let focusedInput = null;

      this.state = {
        modalIsOpen: false,
        enableNotificationCallback: false,
        modalIsOpen: false,


      };

      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);

      //this.openModal = this.openModal.bind(this);

  }

  openModal = (artist, description) => {
    this.setState({modalIsOpen: true});
  }


  closeModal() {
    this.setState({modalIsOpen: false});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
  }

  componentWillMount() {
  }

  render() {

    const { match, location } = this.props;

    return (

  <div className="container-fluid no-breadcrumbs page-myaccount">

          <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal2"
            >
            <form>
              <div className="form-group">
              <h4>{this.state.currentArtist}</h4>
              <br/>
              <p> {this.state.currentDesc} </p>
              </div>
            </form>
          </Modal>
    <QueueAnim type="bottom" className="ui-animate">
      <div className="row">
        <div className="col-sm-12">
          <h2 className="article-title">Paul Childers Live at Horseshoe Tavern</h2>
        </div>
      </div>
      <hr/>
      <div className="row">
        <div className="col-sm-12">
      <div style={{position: 'relative', paddingBottom: '56.25%', overflow: 'hidden'}}><iframe src="https://content.jwplatform.com/players/yyQ4RCZN-yJ29b8c4.html" width="100%" height="100%" frameBorder={0} scrolling="auto" allowFullScreen style={{position: 'absolute'}} /></div>
        </div>

      </div>
    </QueueAnim>

  </div>

  );
  }

}

//module.exports = MainApp;
const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
export { Events as EventsNotConnected };
