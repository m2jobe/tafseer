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
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactRevealText from 'react-reveal-text'
import { SocialIcon } from 'react-social-icons';
import SpotifyPlayer from 'react-spotify-player';

// size may also be a plain string using the presets 'large' or 'compact'
const size = {
  width: '100%',
  height: 400,
};
const view = 'list'; // or 'coverart'
const theme = 'black'; // or 'white'


var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  lazyLoad:true,
  autoplaySpeed: 5000
};
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

class Artist extends React.Component {
  static propTypes = {
      isFetching: PropTypes.bool.isRequired,
      data: PropTypes.string,
      token: PropTypes.string.isRequired,
      actions: PropTypes.shape({
          fetchArtist: PropTypes.func.isRequired,
          dataFetchProtectedData: PropTypes.func.isRequired,
      }).isRequired,
      userName: PropTypes.string,
      artist:PropTypes.array,
  };

  static defaultProps = {
    artist: null,
    userName: null,
  };


  constructor(props) {
      super(props);

      let focusedInput = null;

      this.state = {
        modalIsOpen: false,
        show: false

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



  componentDidMount() {

  }

  componentWillMount() {
    var artist = this.props.match.params.artist;
    if(artist == "Paul-Childers") {
    this.props.actions.fetchArtist("Paul Childers");  
    } else {
    this.props.actions.fetchArtist(artist);	
    }
  }

  componentDidUpdate(prevProps,prevState) {
      if(prevProps.artist != this.props.artist) {
        setTimeout(() => {
          this.setState({ show: true });
        }, 400);
      }
  }

  shouldComponentUpdate() {
    return true;
  }


  render() {

    const { match, location, artist } = this.props;

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

    return (

  <div className="container-fluid no-breadcrumbs page-dashboard">
    {artist ?
      <div>

        <h1 className="article-title"> {artist[0].artist} </h1>
        <Slider {...settings}>
          <div>
            <div style={{backgroundColor: 'black', backgroundImage: 'url('+artist[0].imageurl+')', height:'75vh', width: '100%', backgroundSize:'contain',backgroundRepeat:'no-repeat', backgroundPosition: 'center'}}>
            </div>
          </div>

          <div>
            <div style={{backgroundColor: 'black', backgroundImage: 'url('+artist[0].imageurl1+')', height:'75vh', width: '100%', backgroundSize:'contain',backgroundRepeat:'no-repeat', backgroundPosition: 'center'}}>
            </div>
          </div>

          <div>
            <div style={{backgroundColor: 'black', backgroundImage: 'url('+artist[0].imageurl2+')', height:'75vh', width: '100%', backgroundSize:'contain',backgroundRepeat:'no-repeat', backgroundPosition: 'center'}}>
            </div>
          </div>
        </Slider>


        <div style={bgStyles}>
          <div style={textStyles}>
            <ReactRevealText show={this.state.show} text={artist[0].description}></ReactRevealText>
            <br/>
            <ReactRevealText show={this.state.show} text={artist[0].desc1}></ReactRevealText>
            <br/>
            <ReactRevealText show={this.state.show} text={artist[0].desc2}></ReactRevealText>
            <br/>
            <br/>
            <div className="row" style={{textAlign:'center'}}>
                <div className="col-md-4">
                  <SocialIcon network="facebook" url={artist[0].spotify} style={{ height: 100, width: 100 }} />

                </div>
                <div className="col-md-4">
                  <SocialIcon network="spotify" url={artist[0].spotify}  style={{ height: 100, width: 100 }} />

                </div>
                <div className="col-md-4">
                  <SocialIcon network="twitter" url={artist[0].twitter}  style={{ height: 100, width: 100 }}/>

                </div>
            </div>
            <br/>
            <hr style={{borderTop: '1px solid rgba(255,255,255,1)'}}/>
            <br/>
            <SpotifyPlayer
              uri={artist[0].spotifyURI}
              size={size}
              view={view}
              theme={theme}
            />
          </div>
        </div>

      </div>
      :
      null
    }

      {/* End up Artist */}



  </div>

  );
  }

}

//module.exports = MainApp;
const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        artist: state.data.artist,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
export { Artist as ArtistNotConnected };
