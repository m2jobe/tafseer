import React from 'react';
import QueueAnim from 'rc-queue-anim';
import StatBoxes from './StatBoxes';
import EngagementStats from './EngagementStats';
import BenchmarkChart from './BenchmarkChart';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import classnames from 'classnames';
import HorizontalProducts from './HorizontalProducts';
import HorizontalProducts2 from './HorizontalProducts2';
import '../styles.scss'


const Main = () => (

  <div className="row featured-live-event">
    <div className="col-md-6">
      <div className="card card-white">
        <div className="card-image">
          <img src="http://via.placeholder.com/800x700" alt="" />
        </div>
        <div className="card-content">
          <a className="card-button float-right" href="javascript:;">
            <button className="btn btn-icon btn-icon-round btn-floating btn-danger"><i className="material-icons mdi-sm">sms</i></button>
          </a>
        </div>

      </div>
    </div>
    <div className="col-md-6">
      <div className="card card-white">
        <div className="card-image">
          <img src="http://via.placeholder.com/800x700" alt="" />
        </div>
        <div className="card-content">
          <a className="card-button float-right" href="javascript:;">
            <button className="btn btn-icon btn-icon-round btn-floating btn-danger"><i className="material-icons mdi-sm">sms</i></button>
          </a>
        </div>
      </div>
    </div>
  </div>
);


const MaterialHover = () => (
  <article className="article">
    <h2 className="article-title">Recommended</h2>

    <div className="row">
      <div className="col-xl-4">
        <div className="ih-item ih-material">
          <a href="javascript:;">
            <div className="img">
              <img src="http://via.placeholder.com/600x400" alt="" />
            </div>
            <div className="info">
              <div className="info-mask bg-color-primary" />
              <div className="info-content">
                <div className="info-inner">
                  <h3>Heading Here</h3>
                  <p>Description goes here</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="ih-item ih-material">
          <a href="javascript:;">
            <div className="img">
              <img src="http://via.placeholder.com/600x400" alt="" />
            </div>
            <div className="info">
              <div className="info-mask bg-color-info" />
              <div className="info-content">
                <div className="info-inner">
                  <h3>Heading Here</h3>
                  <p>Description goes here</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="ih-item ih-material">
          <a href="javascript:;">
            <div className="img">
              <img src="http://via.placeholder.com/600x400" alt="" />
            </div>
            <div className="info">
              <div className="info-mask bg-color-dark" />
              <div className="info-content">
                <div className="info-inner">
                  <h3>Heading Here</h3>
                  <p>Description goes here</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

<br/>
    <div className="row">
      <div className="col-xl-4">
        <div className="ih-item ih-material">
          <a href="javascript:;">
            <div className="img">
              <img src="http://via.placeholder.com/600x400" alt="" />
            </div>
            <div className="info">
              <div className="info-mask bg-color-primary" />
              <div className="info-content">
                <div className="info-inner">
                  <h3>Heading Here</h3>
                  <p>Description goes here</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="ih-item ih-material">
          <a href="javascript:;">
            <div className="img">
              <img src="http://via.placeholder.com/600x400" alt="" />
            </div>
            <div className="info">
              <div className="info-mask bg-color-info" />
              <div className="info-content">
                <div className="info-inner">
                  <h3>Heading Here</h3>
                  <p>Description goes here</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="ih-item ih-material">
          <a href="javascript:;">
            <div className="img">
              <img src="http://via.placeholder.com/600x400" alt="" />
            </div>
            <div className="info">
              <div className="info-mask bg-color-dark" />
              <div className="info-content">
                <div className="info-inner">
                  <h3>Heading Here</h3>
                  <p>Description goes here</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

  </article>
    );

const Classic = () => (
  <article className="article">
    <h2 className="article-title">Popular</h2>

    <div className="row">
      <div className="col-xl-4">
        <div className="ih-item ih-material">
          <a href="javascript:;">
            <div className="img">
              <img src="http://via.placeholder.com/600x400" alt="" />
            </div>
            <div className="info">
              <div className="info-mask bg-color-primary" />
              <div className="info-content">
                <div className="info-inner">
                  <h3>Heading Here</h3>
                  <p>Description goes here</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="ih-item ih-material">
          <a href="javascript:;">
            <div className="img">
              <img src="http://via.placeholder.com/600x400" alt="" />
            </div>
            <div className="info">
              <div className="info-mask bg-color-info" />
              <div className="info-content">
                <div className="info-inner">
                  <h3>Heading Here</h3>
                  <p>Description goes here</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="ih-item ih-material">
          <a href="javascript:;">
            <div className="img">
              <img src="http://via.placeholder.com/600x400" alt="" />
            </div>
            <div className="info">
              <div className="info-mask bg-color-dark" />
              <div className="info-content">
                <div className="info-inner">
                  <h3>Heading Here</h3>
                  <p>Description goes here</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
<br/>
    <div className="row">
      <div className="col-xl-4">
        <div className="ih-item ih-material">
          <a href="javascript:;">
            <div className="img">
              <img src="http://via.placeholder.com/600x400" alt="" />
            </div>
            <div className="info">
              <div className="info-mask bg-color-primary" />
              <div className="info-content">
                <div className="info-inner">
                  <h3>Heading Here</h3>
                  <p>Description goes here</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="ih-item ih-material">
          <a href="javascript:;">
            <div className="img">
              <img src="http://via.placeholder.com/600x400" alt="" />
            </div>
            <div className="info">
              <div className="info-mask bg-color-info" />
              <div className="info-content">
                <div className="info-inner">
                  <h3>Heading Here</h3>
                  <p>Description goes here</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="ih-item ih-material">
          <a href="javascript:;">
            <div className="img">
              <img src="http://via.placeholder.com/600x400" alt="" />
            </div>
            <div className="info">
              <div className="info-mask bg-color-dark" />
              <div className="info-content">
                <div className="info-inner">
                  <h3>Heading Here</h3>
                  <p>Description goes here</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>


  </article>
);

const Dashboard = () => (
  <div className="container-fluid no-breadcrumbs page-dashboard">

    <QueueAnim type="bottom" className="ui-animate">
      <h2 className="article-title">Featured Live Events</h2>
      <Main />
      <div key="3"><MaterialHover /></div>
      <div key="4"> <Classic /></div>
    </QueueAnim>

  </div>
);

module.exports = Dashboard;
