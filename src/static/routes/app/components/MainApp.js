import React from 'react';
import { Route } from 'react-router-dom';
import loadable from 'react-loadable';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import Customizer from 'components/Customizer';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as actionCreators from '../../../actions/data';
import PropTypes from 'prop-types';

import Spinner from 'react-spinkit';

// import Chart from '../routes/chart/'
// import ECommerce from '../routes/ecommerce/'
// import Form from '../routes/form/'
// import Page from '../routes/page/'
// import PageLayout from '../routes/page-layout/'
// import Table from '../routes/table/'
// import UI from '../routes/ui/'


function LoadingComponent() {
  return  <div style={{zIndex: 10000, top: '33vh', display: 'table', position: 'relative', margin: 'auto'}}><Spinner name="ball-grid-pulse" /></div>;
}


let AsyncHome= loadable({
  loader: () => import('../routes/home/'),
  loading: LoadingComponent
})
let AsyncContent = loadable({
  loader: () => import('../routes/content/'),
  loading: LoadingComponent
})



class MainApp extends React.Component {
  static propTypes = {
      isFetching: PropTypes.bool.isRequired,
      data: PropTypes.string,
      token: PropTypes.string.isRequired,
      actions: PropTypes.shape({
          dataFetchProtectedData: PropTypes.func.isRequired
      }).isRequired
  };

  static defaultProps = {
      data: ''
  };

  componentWillMount() {

  }

  componentDidMount() {
  }

  render() {
    const { match, location } = this.props;

    return (
      <div className="main-app-container">

        <Sidenav />


        <section id="page-container" className="app-page-container">
          {this.props.location.pathname.indexOf("content") >= 0 ?
          <Header />
          :
          null
          }
          <div className="app-content-wrapper">
            <div className="app-content">
              <div className="full-height">
                  <Route path={`${match.url}/home`} component={AsyncHome} />
                  <Route path={`${match.url}/content/:surah/:ayat`} component={AsyncContent} />

              </div>
            </div>

            {/*<Footer />*/}
          </div>
        </section>

        <Customizer />

      </div>
    );
  }
}

//module.exports = MainApp;
const mapStateToProps = (state) => {
    return {
        data: state.data.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
export { MainApp as MainAppNotConnected };
