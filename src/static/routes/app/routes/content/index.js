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
import Moment from 'react-moment';
import 'moment-timezone';

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
          dataFetchProtectedData: PropTypes.func.isRequired,
          fetchComments: PropTypes.func.isRequired,
      }).isRequired,
      triggerNotification: PropTypes.bool,
      userName: PropTypes.string,
      video:PropTypes.array,



  };

  static defaultProps = {
    triggerNotification: false,
    userName: null,
    video: null,
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
    console.log(this.props.match.params.videoID);

    /* Put this in

    const token = this.props.token;
    console.log("this is the token " + token);
    this.props.actions.dataFetchProtectedData(token);
    */
  }

  componentWillMount() {
    var videoID = this.props.match.params.videoID;
    this.props.actions.fetchVideo(videoID);
    this.props.actions.fetchComments(videoID);
  }

  componentDidUpdate(prevProps,prevState) {
    if(prevProps.video != this.props.video) {
      if(this.props.video[0].setList != ""){
      var array = this.props.video[0].setList.split(',');
      var array2 = this.props.video[0].setListTime.split(',');

      this.setState({setListData: array})
      this.setState({setListTimeData: array2})

      }
    }
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
    {this.props.video ?
      <div>

        <h2 className="article-title"> {this.props.video[0].artist} </h2>


        <h4 style={{color: "white"}}>{this.props.video[0].name}  </h4>

        <h6 style={{color: "white"}}>Live streamed on {new Date( Date.parse(this.props.video[0].date_added)).toDateString()}  </h6>

        <ReactJWPlayer
          customProps={{
          sharing: {
          link: ''
          }
          }}
          playerId='1'
          playerScript='https://content.jwplatform.com/libraries/yJ29b8c4.js'
          playlist={'https://content.jwplatform.com/feeds/'+this.props.video[0].url+'.json'}

        />

        {this.state.setListData ?
        <div style={bgStyles}>
          <div  style={textStyles}>
            <h2> {this.props.video[0].artist} setlist <br/>    <small style={{fontSize:'14px'}}>Click on a song name to skip </small></h2>
              {this.state.setListData.map(function(name, index){
                  return <div><a onClick={() => this.onMoveTo(parseInt(this.state.setListTimeData[index]))}> {index +1}. {name} </a> <br/></div>;
                },this )}
          </div>
        </div>
        :
        null
        }

      </div>
      :
      null
    }

      {/* End up BANNERS */}



  </div>

  );
  }

}

//module.exports = MainApp;
const mapStateToProps = (state) => {
    return {
        triggerNotification: state.data.triggerNotification,
        userName: state.auth.userName,
        video: state.data.video,
        comments: state.data.comments,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
export { Content as ContentNotConnected };
