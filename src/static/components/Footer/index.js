import React from 'react';
import APPCONFIG from 'constants/Config';

class Footer extends React.Component {
  render() {
    return (
      <section className="app-footer">
        <div className="container-fluid">
          <span className="float-left">
            <span>Copyright © <a className="brand" target="_blank" href={APPCONFIG.productLink}>{APPCONFIG.brand}</a> {APPCONFIG.year}</span>
          </span>
        </div>
      </section>
    );
  }
}

module.exports = Footer;
