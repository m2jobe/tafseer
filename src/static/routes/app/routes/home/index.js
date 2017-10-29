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
import RaisedButton from 'material-ui/RaisedButton';

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

class Home extends React.Component {
  static propTypes = {
      dispatch: PropTypes.func.isRequired,
      isFetching: PropTypes.bool.isRequired,
      data: PropTypes.string,
      token: PropTypes.string.isRequired,
      actions: PropTypes.shape({
          dataFetchProtectedData: PropTypes.func.isRequired

      }).isRequired,
      triggerNotification: PropTypes.bool,

  };

  static defaultProps = {
    banners: null,
    triggerNotification: false,
    userName: null,
    videos: null,


  };


  constructor(props) {
      super(props);

      let focusedInput = null;

      this.state = {
        currentBanners: null,
        enableNotificationCallback: false

      };
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


  saveUserNotificationRequest = (currentArtist) => {
      if(this.props.userName) {
        this.props.actions.saveUserNotificationRequest(this.props.userName, currentArtist);
      } else {
        NotificationManager.warning('You need to sign in to subsribe for events', 'Oops', 3000);

      }

  }


  componentWillMount() {

    this.props.actions.fetchBanners();
    this.props.actions.fetchVideos();
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.banners != nextProps.banners)  {
      if(nextProps.banners.length == 1 ) {
        const imgLeft = {
          backgroundImage: 'url('+nextProps.banners[0].image+')',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundColor :'black'
        };
        var currentBanners = nextProps.banners.map((object) =>
          <div className="col-md-12">
            <div className="feature-callout feature-content-right card-white image-pull clearfix">
                <div className="container-fluid with-maxwidth">
                  <div className="col-12 col-md-6 offset-md-6">
                    <div className="callout-feature-content">
                      <a onClick={()=>  this.props.dispatch(push('/app/artist/'+object.artist ))} className="banner-artist-title">{object.artist }</a>
                      <h5>{object.location} </h5>
                      <h6>Date: {object.dateText} </h6>
                      <RaisedButton onClick={() => this.saveUserNotificationRequest(object.artist )} label="Notify me" primary />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 feature-callout-image-pull" style={imgLeft} />

            </div>
          </div>

        );
      } else if(nextProps.banners.length == 2) {
        var currentBanners = nextProps.banners.map((object) =>
            <div className="col-md-6">
              <div className="card card-white">
                <div className="card-image">
                  <img src={object.image} alt="" />
                  <span className="card-title">{object.artist} - {object.location} </span>
                </div>
                <div className="card-content">
                  <a className="card-button float-right" href="javascript:;">
                    <button onClick={() => this.saveUserNotificationRequest()} className="btn btn-icon btn-icon-round btn-floating btn-danger"><i className="material-icons mdi-sm">sms</i></button>
                  </a>
                  <p>Date: {object.dateText}</p>
                </div>
              </div>
            </div>

        );
      } else if (nextProps.banners.length == 3) {
        var currentBanners = nextProps.banners.map((object) =>
            <div className="col-md-4">
              <div className="card card-white">
                <div className="card-image">
                  <img src={object.image} alt="" />
                  <span className="card-title">{object.artist} - {object.location} </span>
                </div>
                <div className="card-content">
                  <a className="card-button float-right" href="javascript:;">
                    <button onClick={() => this.saveUserNotificationRequest()} className="btn btn-icon btn-icon-round btn-floating btn-danger"><i className="material-icons mdi-sm">sms</i></button>
                  </a>
                  <p>Date: {object.dateText}</p>
                </div>
              </div>
            </div>

        );
      }

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

  }


  goToVideo = (id) => {
    this.props.dispatch(push('/app/content/'+id ));

  }



  render() {
    var banners = null


    const { match, location } = this.props;

    return (

  <div className="container-fluid no-breadcrumbs page-dashboard">

    <QueueAnim type="bottom" className="ui-animate">
      <h2 className="article-title">Upcoming Live Events</h2>

      <div className="row featured-live-event">
        {this.state.currentBanners}
      </div>

      {/* End up BANNERS */}

      <article className="article">
        <h2 className="article-title">Recent Streams</h2>
        { this.props.videos ?
        <div className="row">
          {this.props.videos.map(function (object) {
              return (
                <div className="col-xl-4 tm-thumbnail" key={object.id}>
                  <div className="ih-item ih-material">
                    <a href="javascript:;">
                      <div className="img">
                        <img src={object.thumbnail} alt="" />
                      </div>
                      <div className="info">
                        <div className="info-mask bg-color-dark" />
                        <div className="info-content">
                          <div className="info-inner">
                            <a style={{textDecoration: "dashed"}}><h3>{object.artist}</h3></a>
                            <p>{object.name}</p>
                            <button onClick={() => this.goToVideo(object.id)} className="btn btn-primary"> Play </button>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              );

          },this ) }
        </div>
        :
        null
        }
      </article>


    </QueueAnim>
    <NotificationContainer/>

  </div>

  );
  }

}

//module.exports = MainApp;
const mapStateToProps = (state) => {
    return {
        banners: state.data.banners,
        triggerNotification: state.data.triggerNotification,
        userName: state.auth.userName,
        videos: state.data.videos,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
export { Home as HomeNotConnected };
