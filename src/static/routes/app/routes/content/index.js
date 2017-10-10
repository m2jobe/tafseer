import React from 'react';
import QueueAnim from 'rc-queue-anim';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
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
import ReactJWPlayer from 'react-jw-player';

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

class Content extends React.Component {
  static propTypes = {
      isFetching: PropTypes.bool.isRequired,
      data: PropTypes.string,
      token: PropTypes.string.isRequired,
      actions: PropTypes.shape({
          fetchVideos: PropTypes.func.isRequired,
          saveUserNotificationRequest: React.PropTypes.func.isRequired

      }).isRequired,
      triggerNotification: PropTypes.bool,
      userEmail: PropTypes.string,
      video:PropTypes.array,



  };

  static defaultProps = {
    triggerNotification: false,
    userEmail: null,
    video: null,
  };


  constructor(props) {
      super(props);

      let focusedInput = null;

      this.state = {
        currentBanners: null,
        modalIsOpen: false,
        currentArtist: '',
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


  saveUserNotificationRequest = () => {
      this.props.actions.saveUserNotificationRequest(this.props.userEmail, this.state.currentArtist);
      this.closeModal();
  }


  componentWillMount() {
    this.props.actions.fetchVideo(this.props.match.params.videoID);

  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.banners != nextProps.banners)  {
      var currentBanners = nextProps.banners.map((object) =>
          <div className="col-md-6">
            <div className="card card-white">
              <div className="card-image">
                <img src={object.image} alt="" />
                <span className="card-title">{object.artist} - {object.location} </span>
              </div>
              <div className="card-content">
                <a className="card-button float-right" href="javascript:;">
                  <button onClick={() => this.openModal(object.artist)} className="btn btn-icon btn-icon-round btn-floating btn-danger"><i className="material-icons mdi-sm">sms</i></button>
                </a>
                <p>Date: {object.dateText}</p>
              </div>
            </div>
          </div>

      );
      this.setState({currentBanners: currentBanners})
    }

  }

  componentDidUpdate() {
    switch (this.props.triggerNotification) {
      case 'no':
        break;
      case 'success':
        NotificationManager.success('You will be notified right before this event begins!', 'Subscribed');
        this.props.actions.notificationRequestComplete();
        break;
      case 'duplicate':
        NotificationManager.warning('You already subscribed', 'Oops', 3000);
        this.props.actions.notificationRequestComplete();
        break;
    }

    console.log("video" + this.props.video);
  }


  goToVideo = (id) => {
    console.log(this.props.match.params.videoID);

  }



  render() {
    var banners = null


    const { match, location } = this.props;

    return (

  <div className="container-fluid no-breadcrumbs page-dashboard">

      <h2 className="article-title">Upcoming Live Events</h2>

      <ReactJWPlayer
        playerId='A4dWigXp'
        playerScript='https://content.jwplatform.com/libraries/CSUFB620.js'
        playlist='https://cdn.jwplayer.com/v2/playlists/avk8QtIW'
      />

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
      {/* End up BANNERS */}


    <NotificationContainer/>

  </div>

  );
  }

}

//module.exports = MainApp;
const mapStateToProps = (state) => {
    return {
        triggerNotification: state.data.triggerNotification,
        userEmail: state.auth.userEmail,
        video: state.data.video,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
export { Content as ContentNotConnected };
