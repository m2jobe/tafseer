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
          fetchVideo: PropTypes.func.isRequired,
          fetchSurah: PropTypes.func.isRequired,
          fetchComments: PropTypes.func.isRequired,
      }).isRequired,
      triggerNotification: PropTypes.bool,
      userName: PropTypes.string,
      surah:PropTypes.array,



  };

  static defaultProps = {
    triggerNotification: false,
    userName: null,
    surah: null,
    comments:null,
  };


  constructor(props) {
      super(props);

      let focusedInput = null;

      this.state = {
        currentBanners: null,
        modalIsOpen: false,
        currentArtist: '',
        enableNotificationCallback: false,
        setListData: null,
        setListTimeData:null

      };

      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.onMoveTo = this.onMoveTo.bind(this);

      //this.openModal = this.openModal.bind(this);

  }


  onMoveTo(position) {
    window.jwplayer('1').seek(position);
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

  componentWillMount() {

  }

  handleNewComment = (comment) => {
		console.log(comment.text);
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


  componentDidUpdate(prevProps, prevState) {
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
  }

  componentDidMount() {

    /* Put this in

    const token = this.props.token;
    console.log("this is the token " + token);
    this.props.actions.dataFetchProtectedData(token);
    */
  }

  componentWillMount() {
    var surah = this.props.match.params.surah;
    var ayat = this.props.match.params.ayat;

    this.props.actions.fetchSurah(surah);
  }

  componentDidUpdate(prevProps,prevState) {

  }



  render() {
    var banners = null

        const bgStyles = {
      background: 'linear-gradient(135deg, #723362, #9d223c)',
      padding: '36px',
    };
    const textStyles = {
      color: 'white',
      fontSize: '16px',
      lineHeight: '36px',
      fontFamily: 'sans-serif',
      paddingLeft: '1em', // to compensate for letter spacing
    };

    const { match, location } = this.props;

    return (

  <div className="container-fluid no-breadcrumbs page-dashboard">
    <div className="row">
      <div className="col-sm-12">
        <h2> {this.props.match.params.surah} </h2>
      </div>
    </div>

    <div className="row">
      <div className="col-sm-12 introduction" id="introduction">
        Wu tang bang with us
      </div>
    </div>

    <div className="row">
      <div className="col-sm-12 teachings" id="teachings">
        Who roll cant with us ,cant one
      </div>
    </div>

    <div className="row">
      <div className="col-sm-12 mainContent" id="mainContent">
        Whistle whistle whipping on this thing for so long now
      </div>
    </div>

    <div className="row">
      <div className="col-sm-12 appendix" id="appendix">
        Whistle whistle whipping on this thing for so long now
      </div>
    </div>

  </div>

  );
  }

}

//module.exports = MainApp;
const mapStateToProps = (state) => {
    return {
        triggerNotification: state.data.triggerNotification,
        userName: state.auth.userName,
        surah: state.data.surah,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
export { Content as ContentNotConnected };
