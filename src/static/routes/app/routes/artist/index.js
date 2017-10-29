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
    this.props.actions.fetchArtist(artist);
  }

  componentDidUpdate() {
      console.log(this.props.artist);
  }

  shouldComponentUpdate() {
    return true;
  }


  render() {

    const { match, location, artist } = this.props;

    return (

  <div className="container-fluid no-breadcrumbs page-dashboard">
    {artist ?
      <div>

        <h2 className="article-title"> {artist[0].artist} </h2>




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
