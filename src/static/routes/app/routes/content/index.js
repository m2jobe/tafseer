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

function createMarkup(object) { return {__html: object}; };

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

class Content extends React.Component {
  static propTypes = {
      dispatch: PropTypes.func.isRequired,
      isFetching: PropTypes.bool.isRequired,
      data: PropTypes.string,
      actions: PropTypes.shape({
          fetchSurah: PropTypes.func.isRequired,
          fetchSurahIntroAndAppendix: PropTypes.func.isRequired
      }).isRequired,
      surah: PropTypes.array,
      surahIntroAndAppendix: PropTypes.array
  };

  static defaultProps = {
    surah: null,
    surahIntroAndAppendix: null
  };


  constructor(props) {
      super(props);

      let focusedInput = null;

      this.state = {
        enableNotificationCallback: false,
        surahOptions: null,
        ayatOptions: null,
        currentSurah:null,
        currentAyat:null,
      };
      this.initTranslationArea = this.initTranslationArea.bind(this);

      this.prepareTranslationArea = this.prepareTranslationArea.bind(this);
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

    var surah = this.props.match.params.surah;
    var ayat = this.props.match.params.ayat;

    this.props.actions.fetchSurah(surah);
    this.props.actions.fetchSurahIntroAndAppendix(surah);

    //this.props.actions.fetchSurahs();
  }

  componentWillUpdate(nextProps, nextState) {
    //updates when surah changes

    if(this.props.surah != nextProps.surah)  {
      // Pick up ayat options when surah changes
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.surahIntroAndAppendix != prevProps.surahIntroAndAppendix) {
      $('#introduction').html(this.props.surahIntroAndAppendix[0].surahIntro);
      $('#appendix').html(this.props.surahIntroAndAppendix[0].surahAppendix)

    }

    if(this.props.surah != prevProps.surah) {
      this.prepareTranslationArea();
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

  initTranslationArea = (text) => {
    $('#mainContent').append(text)
  }

  prepareTranslationArea = () => {
    $('#mainContent').text('');
    for (var i = 0; i < this.props.surah.length; i++) {

    var rangeStart = this.props.surah[i].rangeStart;
    var rangeEnd = this.props.surah[i].rangeEnd;

    var rangeName = rangeStart + '-' +this.props.surah[i].rangeEnd;


    if(i<this.props.surah.length-1) {
      var tempvar=i+1;
      var connectedTo = this.props.surah[tempvar].connectPrev;
    } else {
      var connectedTo = "no";
    }


    if(connectedTo == "yes") {
      if(rangeStart == rangeEnd) {
        $('#ayat').append( '<option value="'+rangeName+'">'+rangeStart+'</option>' );
      } else {
        $('#ayat').append( '<option value="'+rangeName+'">'+rangeStart+ ' - ' +rangeEnd+'</option>' );
      }
      var builderString = "";
      var builderString2 = "";
      var builderString3 = "";
      var finalBuilder = "";
      builderString += "<div class='row container-flex' > <div class='col-sm-6 first'> <div class='translations' name='"+rangeName+"' style='' id='"+rangeName+"' style='font-size:1em; font-family: 'Open Sans', sans-serif; font-weight: 400;'>"+ this.props.surah[i].translation;

      builderString2 += "</div></div> <div class='col-sm-6 second'> <div class='quranTextFont1' style='; direction: rtl; font-size:1.8em'  name='"+rangeName+"A' id='"+rangeName+"A'>"+ "<span style='display:inline'>" + this.props.surah[i].quranText + "</span>";

      builderString3 += "</div> </div>  </div> <br/>  <div class='row' > <div class='col-md-12'><div class='tafseer'  name='"+rangeName+"E' id='"+rangeName+"E' style='font-size:1em; font-family: 'Open Sans', sans-serif; font-weight: 300;' >"+ this.props.surah[i].explanation;

      finalBuilder = " </div></div> </div>";

      var keepCount = i+1;
      for(var j = i+1; j < this.props.surah.length; j++) {
              var rangeStart = this.props.surah[j].rangeStart;
              var rangeEnd = this.props.surah[j].rangeEnd;

              var rangeName = rangeStart + '-' + rangeEnd;

              var connectedTo="";

              if(j<=this.props.surah.length-1) {
                 connectedTo = this.props.surah[j].connectPrev;
                //("connectedTo " + connectedTo);
              } else {
                 connectedTo = "no";

              }
              if (connectedTo=="yes") {
                var quranText = "<span id='"+rangeName+"' style='display:inline'>" +  this.props.surah[j].quranText + "</span>"
                builderString += this.props.surah[j].translation;

                builderString2 += quranText;
                builderString3 += this.props.surah[j].explanation;


                  /*if(rangeStart == rangeEnd) {
                  $('#ayat').append( '<option value="'+rangeName+'">'+rangeStart+'</option>' );
                  } else {
                  $('#ayat').append( '<option value="'+rangeName+'">'+rangeStart+ ' - ' +rangeEnd+'</option>' );
                }*/


                if(j == this.props.surah.length-1) {
                                    var completeBuild = builderString + builderString2  + finalBuilder + "<br/>";
                ///(completeBuild + "-----------------------------------BREAK---------------------------------------");
                this.initTranslationArea(completeBuild);
                                keepCount = j;
                            j=this.props.surah.length;
                            i=this.props.surah.length;
                break;

                }
              } else {
                var completeBuild = builderString + builderString2  + finalBuilder + "<br/>";
                ///(completeBuild + "-----------------------------------BREAK---------------------------------------");
                this.initTranslationArea(completeBuild);
                                keepCount = j;
                break;

              }
              keepCount = j;

      }

      if(keepCount != this.props.surah.length-1) {
        i = keepCount-1;
        //console.log("old i :" + i);
        //console.log("old keepcount :" + keepCount);
      } else {
          i++;
       //i = keepCount;
        //console.log("new i :" + i);
        //console.log("new keepcount :" + keepCount);
      }

      } else {
            /*if(rangeStart == rangeEnd) {
            $('#ayat').append( '<option value="'+rangeName+'">'+rangeStart+'</option>' );
            } else {
            $('#ayat').append( '<option value="'+rangeName+'">'+rangeStart+ ' - ' +rangeEnd+'</option>' );
            }*/
            //this.initTranslationArea("<div class='row container-flex'> <div class='col-sm-6 first'> <div class='translations' name='"+rangeName+"' id='"+rangeName+"' style='font-size:1em; font-family: 'Open Sans', sans-serif; font-weight: 400;'>"+ this.props.surah[i].translation + "</div></div> <div class='col-sm-6 second'> <div class='quranTextFont1' style='direction: rtl; font-size:1.8em'  name='"+rangeName+"A' id='"+rangeName+"A'>"+ this.props.surah[i].quranText + "</div> </div>  </div> <br/> <div class='row' > <div class='col-md-12'><div class='tafseer'  name='"+rangeName+"E' id='"+rangeName+"E' style='font-size:1em; font-family: 'Open Sans', sans-serif; font-weight: 300;' >"+ this.props.surah[i].explanation + " </div></div> </div> <br/>");

      }
    }
  }


  render() {
    var banners = null


    const { match, location } = this.props;

    return (

  <div className="container-fluid no-breadcrumbs Content-page-container">
      {this.props.surahIntroAndAppendix ?
        <QueueAnim type="bottom" className="ui-animate">

          {/*Title/Checkbox Section */}
          <section>
            <div className="row">
              <div className="col-sm-12">
                <h2> {this.props.surahIntroAndAppendix[0].surahLabel} </h2>
              </div>
            </div>
          </section>

          {/*Introduction Section */}
          <section>
            <div className="row">
              <div className="col-sm-12" id="introduction">
              </div>
            </div>
          </section>


          <div id="mainContent" style={{width:'100%'}}>



          </div>

          {/*Appendix Section */}
          <section>
            <div className="row">
              <div className="col-sm-12" id="appendix">
              </div>
            </div>
          </section>


      </QueueAnim>

      :
      null

    }

  </div>

  );
  }

}

//module.exports = MainApp;
const mapStateToProps = (state) => {
    return {
        surah: state.data.surah,
        surahIntroAndAppendix: state.data.surahIntroAndAppendix
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
export { Content as ContentNotConnected };
