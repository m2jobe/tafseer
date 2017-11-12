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
import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';



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
      actions: PropTypes.shape({
          fetchSurahs: PropTypes.func.isRequired,
          fetchAyats: PropTypes.func.isRequired
      }).isRequired,
      surahs: PropTypes.array,
      ayats: PropTypes.array

  };

  static defaultProps = {
    surahs: null,
    ayats: null
  };


  constructor(props) {
      super(props);

      let focusedInput = null;

      this.state = {
        enableNotificationCallback: false,
        surahOptions: null,
        ayatOptions: null,
        currentSurah:null,
        currentAyat:null
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



  componentWillMount() {

    this.props.actions.fetchSurahs();
  }

  componentWillUpdate(nextProps, nextState) {
    //updates when surah changes

    if(this.props.surahs != nextProps.surahs)  {
      // Pick up ayat options when surah changes
      this.setState({surahOptions: nextProps.surahs})
    }

    if(this.state.currentAyat != nextState.currentAyat)  {
      //Navigate to main page when the state of the current Ayat changes
      this.goToPage(nextState.currentAyat, this.state.currentSurah)
    }

    if(this.state.currentSurah != nextState.currentSurah) {
      //fetch ayats for the particular surah when the dropdown changes
      this.props.actions.fetchAyats(nextState.currentSurah);
    }

    if(this.props.ayats != nextProps.ayats) {
      //When ayat options are received from the server, update the dropdown column
      var ayatJsonArr = [];

      for (var i = 0; i < nextProps.ayats.length; i++) {
          var currentRow = nextProps.ayats[i];

          var rangeStart = currentRow.rangeStart;
          var rangeEnd = currentRow.rangeEnd;
          var rangeValue = rangeStart + '-' + rangeEnd;
          var rangeLabel;
          if(rangeStart == rangeEnd) {
            rangeLabel = rangeStart;
          } else {
            rangeLabel = rangeStart + ' - ' + rangeEnd;
          }
          ayatJsonArr.push({
              label: rangeLabel,
              value: rangeValue
          });
      }

      this.setState({ayatOptions: ayatJsonArr})
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


  goToPage = (ayat,surah) => {
    this.props.dispatch(push('content/'+surah +'/'+ayat));

  }

  surahChange = (val) => {
    this.setState({currentSurah: val.value, surahValue:val.value, ayatValue: "Loading..."});
  }

  ayatChange = (val) => {
    this.setState({currentAyat: val.value});
  }

  render() {
    var banners = null


    const { match, location } = this.props;

    return (

  <div className="container-fluid no-breadcrumbs home-page-container">

    <QueueAnim type="bottom" className="ui-animate">
      <section>
      <div className="row homeBackground">
        <div className="col-sm-12">

        </div>
      </div>
    </section>

    <section className="content" style={{marginTop: '5vh'}}>
  {/* Small boxes (Stat box) */}
  <div className="row" id="mainRow">
    <div className="col-md-6">
      <div className="box" style={{background: 'transparent', borderStyle: 'none', boxShadow: 'none', width: '80%', display: 'block', margin: '0 auto'}}>
        {/* /.box-header */}
        <div className="box-body">
          <img style={{width: '100%'}} src="http://tafseer.nfshost.com/dist/img/mainPageLogo.png" />
        </div>
        {/* /.box-body */}
        <div className="box-footer clearfix" style={{background: 'transparent', borderStyle: 'none'}}>
          <button onclick="highlightMe(this); getArticleID(this, 8);" style={{width: '100%', border: 'none', color: 'white', outline: 'none', background: '#8AB1A8', height: 40}}> PREFACE </button> <br /><br />
          <button onclick="highlightMe(this); getArticleID(this, 11);" style={{width: '100%', border: 'none', color: 'white', outline: 'none', background: '#8AB1A8', height: 40}}> INTRODUCTION TO THE QUR-AAN </button>
        </div>
      </div>
      {/* /.box */}
    </div>
    <div className="col-md-6">
      <div className="box" style={{background: 'transparent', borderStyle: 'none', boxShadow: 'none'}}>
        <div className="box-body" >
          <div className="select-options">
            <div className="select-option">
              <Select
                name="surah-field-name"
                value="Select a surah"
                options={this.state.surahOptions}
                onChange={this.surahChange}
                value={this.state.surahValue}
              />
            </div>
            <div className="select-option">
              <Select
                name="ayat-field-name"
                options={this.state.ayatOptions}
                onChange={this.ayatChange}
                value={this.state.ayatValue}
              />
            </div>
            <div className="select-option">
              <div className="input-group m-t-10" style={{backgroundColor: '#E9E9E9'}}>
                <input style={{borderStyle: 'none', borderRadius: 0, height: 40, background: 'transparent'}} type="text" name="query" id="autocomplete" className="form-control ui-autocomplete-input" placeholder="Search..." autoComplete="off" />
                <span style={{background: 'transparent'}} className="input-group-btn">
                  <button style={{border: 0, background: 'transparent', boxShadow: 'none', borderRadius: 0, color: '#179A8A'}} type="button" onclick="searchDB()" className="btn waves-effect waves-light btn-default"><span className="fa fa-search" /></button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="box-footer clprepend-iconearfix" style={{background: 'transparent', borderStyle: 'none'}}>
          <h3 style={{fontSize: 20}}> A contemporary English translation and Tafseer (exegesis) that is unique because it: </h3>
          <ul style={{fontSize: 18}}>
            <li> unveils the implicit linkages between the verses, sections and Soorahs,</li>
            <li> corroborates with the context in which Allah SWT has put them, and</li>
            <li> uses established scientific realities to expound the signs cited therein </li>
          </ul>
          <h3 style={{fontSize: 20}}> while maintaining its congruence with the works of the earlier mainstream mufassireen (exegetes). </h3>
        </div>
        {/* /.box-body */}
      </div>
      {/* /.box */}
    </div>
  </div>
  {/* /.row (main row) */}
</section>

    </QueueAnim>

  </div>

  );
  }

}

//module.exports = MainApp;
const mapStateToProps = (state) => {
    return {
        surahs: state.data.surahs,
        ayats: state.data.ayats
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
