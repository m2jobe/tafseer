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
import requireAuthentication from '../../../utils/requireAuthentication';

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
let AsyncMyAccount = loadable({
  loader: () => import('../routes/myaccount/'),
  loading: LoadingComponent
})
let AsyncEvents = loadable({
  loader: () => import('../routes/events/'),
  loading: LoadingComponent
})

let AsyncArtist = loadable({
  loader: () => import('../routes/artist/'),
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

  render() {
    const { match, location } = this.props;

    return (
      <div className="main-app-container">
        <Sidenav />

        <section id="page-container" className="app-page-container">
          <Header />

          <div className="app-content-wrapper">
            <div className="app-content">
              <div className="full-height">
                  <Route path={`${match.url}/home`} component={AsyncHome} />
                  <Route path={`${match.url}/myaccount`} component={requireAuthentication(AsyncMyAccount)} />
                  <Route path={`${match.url}/event`} component={AsyncEvents} />
                  <Route path={`${match.url}/content/:videoID`} component={AsyncContent} />
                  <Route path={`${match.url}/artist/:artist`} component={AsyncArtist} />

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
        isFetching: state.data.isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
export { MainApp as MainAppNotConnected };
