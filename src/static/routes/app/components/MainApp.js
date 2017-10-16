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

import Dashboard from '../routes/dashboard/'
import Content from '../routes/content/'
import requireAuthentication from '../../../utils/requireAuthentication';

// import Chart from '../routes/chart/'
// import ECommerce from '../routes/ecommerce/'
// import Form from '../routes/form/'
// import Page from '../routes/page/'
// import PageLayout from '../routes/page-layout/'
// import Table from '../routes/table/'
// import UI from '../routes/ui/'

function LoadingComponent() {
  return <div></div>;
}

let AsyncChart = loadable({
  loader: () => import('../routes/chart/'),
  loading: LoadingComponent
})
let AsyncECommerce = loadable({
  loader: () => import('../routes/ecommerce/'),
  loading: LoadingComponent
})
let AsyncForm = loadable({
  loader: () => import('../routes/form/'),
  loading: LoadingComponent
})
let AsyncPage = loadable({
  loader: () => import('../routes/page/'),
  loading: LoadingComponent
})
let AsyncPageLayout = loadable({
  loader: () => import('../routes/page-layout/'),
  loading: LoadingComponent
})
let AsyncTable = loadable({
  loader: () => import('../routes/table/'),
  loading: LoadingComponent
})
let AsyncUI = loadable({
  loader: () => import('../routes/ui/'),
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
                  <Route path={`${match.url}/dashboard`} component={Dashboard} />
                  <Route path={`${match.url}/chart`} component={AsyncChart} />
                  <Route path={`${match.url}/ecommerce`} component={AsyncECommerce} />
                  <Route path={`${match.url}/form`} component={AsyncForm} />
                  <Route path={`${match.url}/page`} component={AsyncPage} />
                  <Route path={`${match.url}/pglayout`} component={AsyncPageLayout} />
                  <Route path={`${match.url}/table`} component={AsyncTable} />
                  <Route path={`${match.url}/ui`} component={AsyncUI} />
                  <Route path={`${match.url}/content/:videoID/:artist/:name`} component={requireAuthentication(Content)} />
              </div>
            </div>

            {/*<Footer />*/}
          </div>
        </section>

        {/*<Customizer />*/}
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
