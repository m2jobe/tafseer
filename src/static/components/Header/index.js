import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import APPCONFIG from 'constants/Config';
import NavLeftList from './NavLeftList';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import UserAvatar from 'react-user-avatar';
import * as actionCreators from '../../actions/data';
import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

const ImgIconButtonStyle = {
  width: '60px',
  height: '60px'
};

const listItemStyle = {
  paddingLeft: '50px' // 36 + 16, algin with sub list
};

const surahs = '[{"id":1,"value":"al-fatihah","label":"Al-Faatiĥah"},{"id":2,"value":"al-baqarah","label":"Al-Baqarah"},{"id":3,"value":"aali-imran","label":"Aali ‘Imran"},{"id":4,"value":"an-nisa","label":" An-Nisaa"},{"id":5,"value":"al-maidah","label":"Al-Maaidah"},{"id":6,"value":"al-anam","label":"Al-An‘aam"},{"id":7,"value":"al-araf","label":"Al-A‘raaf"},{"id":8,"value":"al-anfal","label":"Al-Anfaal"},{"id":9,"value":"at-taubah","label":"At-Tawbah or Al-Baraa’ah"},{"id":10,"value":"yunus","label":"Yoonus"},{"id":11,"value":"hud","label":"Hoode"},{"id":12,"value":"yusuf","label":"Yoosuf"},{"id":13,"value":"ar-rad","label":"Ar-Ra‘d"},{"id":14,"value":"ibrahim","label":"Ibraheem"},{"id":15,"value":"al-hijr","label":"Al-Ĥijr"},{"id":16,"value":"an-nahl","label":"An-Naĥl"},{"id":17,"value":"al-isra","label":"Al-Israa or Banee Israʻeel"},{"id":18,"value":"al-kahf","label":"Al-Kahf"},{"id":19,"value":"maryam","label":"Maryam"},{"id":20,"value":"ta-ha","label":"Ŧaa Haa"},{"id":21,"value":"al-anbiya","label":"Al-Anbiyaa"},{"id":22,"value":"al-haj","label":"Al-Ĥajj"},{"id":23,"value":"al-muminun","label":"Al-Mu’minoon"},{"id":24,"value":"an-nur","label":"An-Noor"},{"id":25,"value":"al-furqan","label":"Al-Furqaan"},{"id":26,"value":"ash-shuara","label":"Ash-Shu‘araa"},{"id":27,"value":"an-naml","label":"An-Naml"},{"id":28,"value":"al-qasas","label":"Al-Qaŝaŝ"},{"id":29,"value":"al-ankabut","label":"Al-‘Ankaboot"},{"id":30,"value":"ar-rum","label":"Ar-Room"},{"id":31,"value":"luqman","label":"Luqman"},{"id":32,"value":"as-sajdah","label":"As-Sajdah"},{"id":33,"value":"al-ahzab","label":"Al-Aĥzaab"},{"id":34,"value":"saba","label":"Sabaa"},{"id":35,"value":"al-fatir","label":"Faaŧir"},{"id":36,"value":"ya-sin","label":"Yaa-Seen"},{"id":37,"value":"as-saffah","label":"Aŝ-Ŝaafaat"},{"id":38,"value":"sad","label":"Ŝaad"},{"id":39,"value":"az-zumar","label":"Az-Zumar"},{"id":40,"value":"ghafar","label":"Al-Mu’min or Ghaafir"},{"id":41,"value":"fusilat","label":"Ĥaa Meem As-Sajdah or Fuŝŝilat"},{"id":42,"value":"ash-shura","label":"Ash-Shoora"},{"id":43,"value":"az-zukhruf","label":"Az-Zukhruf"},{"id":44,"value":"ad-dukhan","label":"Ad-Dukhaan"},{"id":45,"value":"al-jathiyah","label":"Al-Jaathiyah"},{"id":46,"value":"al-ahqaf","label":"Al-Aĥqaaf"},{"id":47,"value":"muhammad","label":"Muĥammad"},{"id":48,"value":"al-fath","label":"Al-Fatĥ"},{"id":49,"value":"al-hujurat","label":"Al-Ĥujuraat"},{"id":50,"value":"qaf","label":"Qaaf"},{"id":51,"value":"adz-dazariyah","label":"Adz-Dzaariyaat"},{"id":52,"value":"at-tur","label":"Aŧ-Ŧoor"},{"id":53,"value":"an-najm","label":"An-Najm"},{"id":54,"value":"al-qamar","label":"Al-Qamar"},{"id":55,"value":"ar-rahman","label":"Ar-Raĥmaan"},{"id":56,"value":"al-waqiah","label":"Al-Waaqiʻah"},{"id":57,"value":"al-hadid","label":"Al-Ĥadeed"},{"id":58,"value":"al-mujadilah","label":"Al-Mujaadalah"},{"id":59,"value":"al-hashr","label":"Al-Ĥashr"},{"id":60,"value":"al-muhtahanah","label":"Al-Mumtaĥinah"},{"id":61,"value":"as-saf","label":"Aŝ-Ŝaff"},{"id":62,"value":"al-jumah","label":"Al-Jumuʻah"},{"id":63,"value":"al-munafiqun","label":"Al-Munaafiqoon"},{"id":64,"value":"at-taghabun","label":"At-Taghaabun"},{"id":65,"value":"at-talaq","label":"Aŧ-Ŧalaaq"},{"id":66,"value":"at-tahrim","label":"At-Taĥreem"},{"id":67,"value":"al-mulk","label":"Al-Mulk"},{"id":68,"value":"al-qalam","label":"Al-Qalam"},{"id":69,"value":"al-haqqah","label":"Al-Ĥaaqqah"},{"id":70,"value":"al-mararij","label":"Al-Ma‘aarij"},{"id":71,"value":"nuh","label":"Nooĥ"},{"id":72,"value":"al-jinn","label":"Al-Jinn"},{"id":73,"value":"al-muzammil","label":"Al-Muzzammil"},{"id":74,"value":"al-mudaththir","label":"Al-Muddaththir"},{"id":75,"value":"al-qiyamah","label":"Al-Qiyaamah"},{"id":76,"value":"al-insan","label":"Ad-Dahr or Al-Insaan"},{"id":77,"value":"al-mursalat","label":"Al-Mursalaat"},{"id":78,"value":"an-naba","label":"An-Nabaa"},{"id":79,"value":"an-naza","label":"An-Naazi‘aat"},{"id":80,"value":"abasa","label":"‘Abasa"},{"id":81,"value":"at-takwir","label":"At-Takweer"},{"id":82,"value":"al-infitar","label":"Al-Infiŧaar"},{"id":83,"value":"al-mutaffifin","label":"Al-Muŧaffifeen "},{"id":84,"value":"al-inshiqaq","label":"Al-Inshiqaaq"},{"id":85,"value":"al-buruj","label":"Al-Burooj"},{"id":86,"value":"al-tariq","label":"Aŧ-Ŧaariq"},{"id":87,"value":"al-ala","label":"Al-A‘laa"},{"id":88,"value":"al-ghashiyah","label":"Al-Ghaashiyah"},{"id":89,"value":"al-fajr","label":"Al-Fajr"},{"id":90,"value":"al-balad","label":"Al-Balad"},{"id":91,"value":"ash-shams","label":"Ash-Shams"},{"id":92,"value":"al-layl","label":"Al-Layl"},{"id":93,"value":"adh-dhuba","label":"Adh-Dhuhaa"},{"id":94,"value":"al-inshirah","label":"Alam-Nashraĥ or Al-Insharaaĥ"},{"id":95,"value":"at-tin","label":"At-Teen"},{"id":96,"value":"al-alaq","label":"Al-‘Alaq"},{"id":97,"value":"al-qadar","label":"Al-Qadr"},{"id":98,"value":"al-bayinah","label":"Al-Bayyinah"},{"id":99,"value":"az-zalzalah","label":"Az-Zilzaal"},{"id":100,"value":"al-adiyah","label":"Al-‘Aadiyaat"},{"id":101,"value":"al-qari","label":"Al-Qaari‘ah"},{"id":102,"value":"at-takathur","label":"At-Takaathur"},{"id":103,"value":"al-asr","label":"Al-‘Aŝr"},{"id":104,"value":"al-humazah","label":"Al-Humazah"},{"id":105,"value":"al-fil","label":"Al-Feel"},{"id":106,"value":"quraish","label":"Al-Quraish"},{"id":107,"value":"al-maun","label":"Al-Maa‘oon"},{"id":108,"value":"al-kauthar","label":"Al-Kawthar"},{"id":109,"value":"al-kafirun","label":"Al-Kaafiroon"},{"id":110,"value":"an-nasr","label":"An-Naŝr"},{"id":111,"value":"al-masad","label":"Al-Lahab or Al-Masadd"},{"id":112,"value":"al-ikhlas","label":"Al-Ikhlaaŝ"},{"id":113,"value":"al-falaq","label":"Al-Falaq"},{"id":114,"value":"an-nas","label":"An-Naas"}]'


class Header extends React.Component {

  static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      dispatch: PropTypes.func.isRequired,
      location: PropTypes.shape({
          pathname: PropTypes.string
      }),
      actions: PropTypes.shape({
          fetchSurahs: PropTypes.func.isRequired,
          fetchAyats: PropTypes.func.isRequired
      }).isRequired,
      surahs: PropTypes.array,
      ayats: PropTypes.array
  };

  static defaultProps = {
      location: undefined,
      surahs: null,
      ayats: null
  };

  constructor(props) {
      super(props);

      let focusedInput = null;

      this.state = {
        surahOptions: null,
        ayatOptions: null,
        currentSurah:null,
        currentAyat:null
      };
  }

  handleChange = (event, value) => {
    this.props.history.push(value);
  }

  logout = () => {
      this.props.dispatch(authLogoutAndRedirect());
  };

  componentDidMount() {
    const sidebarToggler = this.sidebarBtn;
    const $sidebarToggler = $(sidebarToggler);
    const $body = $('#body');

    $sidebarToggler.on('click', (e) => {
      // _sidebar.scss, _page-container.scss
      $body.toggleClass('sidebar-mobile-open');
    });
  }

  login = () => {
    this.props.dispatch(push('/login'));
  }

  render() {
    const { isFixedHeader, colorOption, match } = this.props;

    return (
      <section className="app-header">
        <div
          className={classnames('app-header-inner', {
            'bg-color-light': ['11', '12', '13', '14', '15', '16', '21'].indexOf(colorOption) >= 0,
            'bg-color-dark': colorOption === '31',
            'bg-color-primary': ['22', '32'].indexOf(colorOption) >= 0,
            'bg-color-success': ['23', '33'].indexOf(colorOption) >= 0,
            'bg-color-info': ['24', '34'].indexOf(colorOption) >= 0,
            'bg-color-warning': ['25', '35'].indexOf(colorOption) >= 0,
            'bg-color-danger': ['26', '36'].indexOf(colorOption) >= 0 })}
                >
          <div className="d-lg-none d-xl-none float-left">
            <a href="javascript:;" className="md-button header-icon toggle-sidebar-btn" ref={(c) => { this.sidebarBtn = c; }}>
              <i className="material-icons">menu</i>
            </a>
          </div>

          {/*<div className="brand d-none d-lg-inline-block d-xl-inline-block">
            <h2><Link to="/" style={{fontSize: '23.5px'}}>{APPCONFIG.brand}</Link></h2>
          </div>*/}

          <div className="top-nav-left d-none d-lg-inline-block d-xl-inline-block">
            <NavLeftList />
          </div>


          <div className="top-nav-right">
            <ul className="list-unstyled float-right">
            <div className="select-options-header">
              <div className="select-option-header">
                <Select
                  name="surah-field-name"
                  value="Select a surah"
                  options={JSON.parse(surahs)}
                  onChange={this.surahChange}
                  value={this.state.surahValue}
                />
              </div>
              <div className="select-option-header">
                <Select
                  name="ayat-field-name"
                  options={this.state.ayatOptions}
                  onChange={this.ayatChange}
                  value={this.state.ayatValue}
                />
              </div>
              <div className="select-option-header">
                <div className="input-group m-t-10" style={{backgroundColor: '#E9E9E9'}}>
                  <input style={{borderStyle: 'none', borderRadius: 0, height: 40, background: 'transparent'}} type="text" name="query" id="autocomplete" className="form-control ui-autocomplete-input" placeholder="Search..." autoComplete="off" />
                  <span style={{background: 'transparent'}} className="input-group-btn">
                    <button style={{border: 0, background: 'transparent', boxShadow: 'none', borderRadius: 0, color: '#179A8A'}} type="button" onclick="searchDB()" className="btn waves-effect waves-light btn-default"><span className="fa fa-search" /></button>
                  </span>
                </div>
              </div>

              <a href="#" id="btn-fullscreen" style={{background: 'transparent'}}  className="waves-effect">
              <img style={{width: 25, marginTop: '35%', marginRight: 15}} src="http://tafseer.nfshost.com/dist/img/QuranFullscreen.png" />

              </a>

            </div>

            </ul>
          </div>
        </div>
      </section>
    );
  }
}


const mapStateToProps = state => ({
  colorOption: state.settings.colorOption,
  isFixedHeader: state.settings.isFixedHeader,
  location: state.routing.location,
  surahs: state.data.surahs,
  ayats: state.data.ayats,

});


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
export { Header as HeaderNotConnected };
