import React from 'react';
import QueueAnim from 'rc-queue-anim';

const PricingTables = () => (
  <div>
    <div className="divider divider-lg" />
    <div className="row">
      <div className="col-md-6 col-xsm-6">
        <section className="pricing-table pricing-table-primary">
          <header><h2>Free</h2></header>
          <p className="pricing-price"><span className="pricing-sign">$</span>0.00<span className="pricing-sub">/mo</span></p>
          <div className="pricing-plan-details">
            <p className="pricing-lead">Including</p>
            <ul>
              <li>N/a</li>
            </ul>
          </div>
          <footer><a href="javascript:;" className="btn btn-primary">Buy now</a></footer>
        </section>
      </div>



      <div className="col-md-6 col-xsm-6">
        <section className="pricing-table pricing-table-danger">
          <header> <h2>Premium</h2> </header>
          <p className="pricing-price"><span className="pricing-sign">$</span>9.99<span className="pricing-sub">/mo</span></p>
          <div className="pricing-plan-details">
            <p className="pricing-lead">Including</p>
            <ul>
              <li>HD Streams</li>
            </ul>
          </div>
          <footer><a href="javascript:;" className="btn btn-danger">Get it now</a></footer>
        </section>
      </div>
    </div>


  </div>
);

const Page = () => (
  <section className="container-fluid no-breadcrumbs chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><PricingTables /></div>
    </QueueAnim>
  </section>
);

module.exports = Page;
