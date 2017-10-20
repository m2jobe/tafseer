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


const iconButtonElement = (
  <IconButton
    touch
    tooltip="more"
    tooltipPosition="bottom-left"
    >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class MyAccount extends React.Component {
  static propTypes = {
      dispatch: PropTypes.func.isRequired,
      isFetching: PropTypes.bool.isRequired,
      data: PropTypes.string,
      token: PropTypes.string.isRequired,
      actions: PropTypes.shape({
          dataFetchProtectedData: PropTypes.func.isRequired,
          fetchEventsSubscribedTo: PropTypes.func.isRequired

      }).isRequired,
      triggerNotification: PropTypes.bool,
  };

  static defaultProps = {
    triggerNotification: false,
    userName: null,
    eventsSubscribed:null
  };


  constructor(props) {
      super(props);

      let focusedInput = null;

      this.state = {
        modalIsOpen: false,
        enableNotificationCallback: false

      };

      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);

      //this.openModal = this.openModal.bind(this);

  }

  openModal = (currentArtist) => {
    this.setState({modalIsOpen: true, currentArtist: currentArtist});
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
    this.props.actions.fetchEventsSubscribedTo(this.props.userName);
  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate() {

  }

  render() {

    const { match, location } = this.props;

    return (

  <div className="container-fluid no-breadcrumbs page-dashboard">

          <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal2"
            >
            <form>
              <div className="form-group">
              <h4>Get Notified when this live event begins! </h4>
              <br/>
              <button type="submit"  onClick={() => this.saveUserNotificationRequest()}   className="btn btn-primary card-button"> Notify me </button>
              </div>
            </form>
          </Modal>
    <QueueAnim type="bottom" className="ui-animate">
      <div className="row">
        <div className="col-sm-12">
          <h2 className="article-title">My Account</h2>
        </div>
      </div>
      <hr/>
      <div className="row">
        <div className="col-sm-12">
          <section className="box box-default">
            <div className="box-header">My Event Subscriptions</div>
            <div className="box-body">
              <List>

                <ListItem
                  leftAvatar={<Avatar src="assets/images-demo/avatars/ok-128.jpg" />}
                  rightIconButton={rightIconMenu}
                  primaryText="Brendan Lim"
                  secondaryText={
                    <p>
                      <span style={{color: darkBlack}}>Brunch this weekend?</span><br />
                      I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                    </p>
                  }
                  secondaryTextLines={2}
                />
                <Divider inset />
                <ListItem
                  leftAvatar={<Avatar src="assets/images-demo/avatars/kolage-128.jpg" />}
                  rightIconButton={rightIconMenu}
                  primaryText="me, Scott, Jennifer"
                  secondaryText={
                    <p>
                      <span style={{color: darkBlack}}>Summer BBQ</span><br />
                      Wish I could come, but I&apos;m out of town this weekend.
                    </p>
                  }
                  secondaryTextLines={2}
                />
                <Divider inset />
                <ListItem
                  leftAvatar={<Avatar src="assets/images-demo/avatars/uxceo-128.jpg" />}
                  rightIconButton={rightIconMenu}
                  primaryText="Grace Ng"
                  secondaryText={
                    <p>
                      <span style={{color: darkBlack}}>Oui oui</span><br />
                      Do you have any Paris recs? Have you ever been?
                    </p>
                  }
                  secondaryTextLines={2}
                />
                <Divider inset />
                <ListItem
                  leftAvatar={<Avatar src="assets/images-demo/avatars/kerem-128.jpg" />}
                  rightIconButton={rightIconMenu}
                  primaryText="Kerem Suer"
                  secondaryText={
                    <p>
                      <span style={{color: darkBlack}}>Birthday gift</span><br />
                      Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                    </p>
                  }
                  secondaryTextLines={2}
                />
                <Divider inset />
                <ListItem
                  leftAvatar={<Avatar src="assets/images-demo/avatars/raquelromanp-128.jpg" />}
                  rightIconButton={rightIconMenu}
                  primaryText="Raquel Parrado"
                  secondaryText={
                    <p>
                      <span style={{color: darkBlack}}>Recipe to try</span><br />
                      We should eat this: grated squash. Corn and tomatillo tacos.
                    </p>
                  }
                  secondaryTextLines={2}
                />
              </List>
            </div>
          </section>
        </div>

      </div>
    </QueueAnim>
    <NotificationContainer/>

  </div>

  );
  }

}

//module.exports = MainApp;
const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        eventsSubscribed: state.auth.eventsSubscribed,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
export { MyAccount as MyAccountNotConnected };
