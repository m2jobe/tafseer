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

const surahs = '[{"id":1,"value":"al-fatihah","label":"Al-Faatiĥah"},{"id":2,"value":"al-baqarah","label":"Al-Baqarah"},{"id":3,"value":"aali-imran","label":"Aali ‘Imran"},{"id":4,"value":"an-nisa","label":" An-Nisaa"},{"id":5,"value":"al-maidah","label":"Al-Maaidah"},{"id":6,"value":"al-anam","label":"Al-An‘aam"},{"id":7,"value":"al-araf","label":"Al-A‘raaf"},{"id":8,"value":"al-anfal","label":"Al-Anfaal"},{"id":9,"value":"at-taubah","label":"At-Tawbah or Al-Baraa’ah"},{"id":10,"value":"yunus","label":"Yoonus"},{"id":11,"value":"hud","label":"Hoode"},{"id":12,"value":"yusuf","label":"Yoosuf"},{"id":13,"value":"ar-rad","label":"Ar-Ra‘d"},{"id":14,"value":"ibrahim","label":"Ibraheem"},{"id":15,"value":"al-hijr","label":"Al-Ĥijr"},{"id":16,"value":"an-nahl","label":"An-Naĥl"},{"id":17,"value":"al-isra","label":"Al-Israa or Banee Israʻeel"},{"id":18,"value":"al-kahf","label":"Al-Kahf"},{"id":19,"value":"maryam","label":"Maryam"},{"id":20,"value":"ta-ha","label":"Ŧaa Haa"},{"id":21,"value":"al-anbiya","label":"Al-Anbiyaa"},{"id":22,"value":"al-haj","label":"Al-Ĥajj"},{"id":23,"value":"al-muminun","label":"Al-Mu’minoon"},{"id":24,"value":"an-nur","label":"An-Noor"},{"id":25,"value":"al-furqan","label":"Al-Furqaan"},{"id":26,"value":"ash-shuara","label":"Ash-Shu‘araa"},{"id":27,"value":"an-naml","label":"An-Naml"},{"id":28,"value":"al-qasas","label":"Al-Qaŝaŝ"},{"id":29,"value":"al-ankabut","label":"Al-‘Ankaboot"},{"id":30,"value":"ar-rum","label":"Ar-Room"},{"id":31,"value":"luqman","label":"Luqman"},{"id":32,"value":"as-sajdah","label":"As-Sajdah"},{"id":33,"value":"al-ahzab","label":"Al-Aĥzaab"},{"id":34,"value":"saba","label":"Sabaa"},{"id":35,"value":"al-fatir","label":"Faaŧir"},{"id":36,"value":"ya-sin","label":"Yaa-Seen"},{"id":37,"value":"as-saffah","label":"Aŝ-Ŝaafaat"},{"id":38,"value":"sad","label":"Ŝaad"},{"id":39,"value":"az-zumar","label":"Az-Zumar"},{"id":40,"value":"ghafar","label":"Al-Mu’min or Ghaafir"},{"id":41,"value":"fusilat","label":"Ĥaa Meem As-Sajdah or Fuŝŝilat"},{"id":42,"value":"ash-shura","label":"Ash-Shoora"},{"id":43,"value":"az-zukhruf","label":"Az-Zukhruf"},{"id":44,"value":"ad-dukhan","label":"Ad-Dukhaan"},{"id":45,"value":"al-jathiyah","label":"Al-Jaathiyah"},{"id":46,"value":"al-ahqaf","label":"Al-Aĥqaaf"},{"id":47,"value":"muhammad","label":"Muĥammad"},{"id":48,"value":"al-fath","label":"Al-Fatĥ"},{"id":49,"value":"al-hujurat","label":"Al-Ĥujuraat"},{"id":50,"value":"qaf","label":"Qaaf"},{"id":51,"value":"adz-dazariyah","label":"Adz-Dzaariyaat"},{"id":52,"value":"at-tur","label":"Aŧ-Ŧoor"},{"id":53,"value":"an-najm","label":"An-Najm"},{"id":54,"value":"al-qamar","label":"Al-Qamar"},{"id":55,"value":"ar-rahman","label":"Ar-Raĥmaan"},{"id":56,"value":"al-waqiah","label":"Al-Waaqiʻah"},{"id":57,"value":"al-hadid","label":"Al-Ĥadeed"},{"id":58,"value":"al-mujadilah","label":"Al-Mujaadalah"},{"id":59,"value":"al-hashr","label":"Al-Ĥashr"},{"id":60,"value":"al-muhtahanah","label":"Al-Mumtaĥinah"},{"id":61,"value":"as-saf","label":"Aŝ-Ŝaff"},{"id":62,"value":"al-jumah","label":"Al-Jumuʻah"},{"id":63,"value":"al-munafiqun","label":"Al-Munaafiqoon"},{"id":64,"value":"at-taghabun","label":"At-Taghaabun"},{"id":65,"value":"at-talaq","label":"Aŧ-Ŧalaaq"},{"id":66,"value":"at-tahrim","label":"At-Taĥreem"},{"id":67,"value":"al-mulk","label":"Al-Mulk"},{"id":68,"value":"al-qalam","label":"Al-Qalam"},{"id":69,"value":"al-haqqah","label":"Al-Ĥaaqqah"},{"id":70,"value":"al-mararij","label":"Al-Ma‘aarij"},{"id":71,"value":"nuh","label":"Nooĥ"},{"id":72,"value":"al-jinn","label":"Al-Jinn"},{"id":73,"value":"al-muzammil","label":"Al-Muzzammil"},{"id":74,"value":"al-mudaththir","label":"Al-Muddaththir"},{"id":75,"value":"al-qiyamah","label":"Al-Qiyaamah"},{"id":76,"value":"al-insan","label":"Ad-Dahr or Al-Insaan"},{"id":77,"value":"al-mursalat","label":"Al-Mursalaat"},{"id":78,"value":"an-naba","label":"An-Nabaa"},{"id":79,"value":"an-naza","label":"An-Naazi‘aat"},{"id":80,"value":"abasa","label":"‘Abasa"},{"id":81,"value":"at-takwir","label":"At-Takweer"},{"id":82,"value":"al-infitar","label":"Al-Infiŧaar"},{"id":83,"value":"al-mutaffifin","label":"Al-Muŧaffifeen "},{"id":84,"value":"al-inshiqaq","label":"Al-Inshiqaaq"},{"id":85,"value":"al-buruj","label":"Al-Burooj"},{"id":86,"value":"al-tariq","label":"Aŧ-Ŧaariq"},{"id":87,"value":"al-ala","label":"Al-A‘laa"},{"id":88,"value":"al-ghashiyah","label":"Al-Ghaashiyah"},{"id":89,"value":"al-fajr","label":"Al-Fajr"},{"id":90,"value":"al-balad","label":"Al-Balad"},{"id":91,"value":"ash-shams","label":"Ash-Shams"},{"id":92,"value":"al-layl","label":"Al-Layl"},{"id":93,"value":"adh-dhuba","label":"Adh-Dhuhaa"},{"id":94,"value":"al-inshirah","label":"Alam-Nashraĥ or Al-Insharaaĥ"},{"id":95,"value":"at-tin","label":"At-Teen"},{"id":96,"value":"al-alaq","label":"Al-‘Alaq"},{"id":97,"value":"al-qadar","label":"Al-Qadr"},{"id":98,"value":"al-bayinah","label":"Al-Bayyinah"},{"id":99,"value":"az-zalzalah","label":"Az-Zilzaal"},{"id":100,"value":"al-adiyah","label":"Al-‘Aadiyaat"},{"id":101,"value":"al-qari","label":"Al-Qaari‘ah"},{"id":102,"value":"at-takathur","label":"At-Takaathur"},{"id":103,"value":"al-asr","label":"Al-‘Aŝr"},{"id":104,"value":"al-humazah","label":"Al-Humazah"},{"id":105,"value":"al-fil","label":"Al-Feel"},{"id":106,"value":"quraish","label":"Al-Quraish"},{"id":107,"value":"al-maun","label":"Al-Maa‘oon"},{"id":108,"value":"al-kauthar","label":"Al-Kawthar"},{"id":109,"value":"al-kafirun","label":"Al-Kaafiroon"},{"id":110,"value":"an-nasr","label":"An-Naŝr"},{"id":111,"value":"al-masad","label":"Al-Lahab or Al-Masadd"},{"id":112,"value":"al-ikhlas","label":"Al-Ikhlaaŝ"},{"id":113,"value":"al-falaq","label":"Al-Falaq"},{"id":114,"value":"an-nas","label":"An-Naas"}]'


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

    //this.props.actions.fetchSurahs();
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
                options={JSON.parse(surahs)}
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
