import React from 'react';
import classnames from 'classnames';
import QueueAnim from 'rc-queue-anim';

const productImagePath = 'assets/images-demo/products/';
const products = [
  {
    name: 'Silver Live Tour',
    img: `https://i.imgur.com/VaVmXgt.png`,
    sash: 'sash-primary',
    sash_icon: 'star',
    sash_text: 'Featured'
  }, {
    name: 'Black Live Tour',
    img: `https://i.imgur.com/VaVmXgt.png`,
    sash: 'sash-info',
    sash_icon: 'card_giftcard',
    sash_text: 'Playing Now'
  }, {
    name: 'Red Live Tour',
    img: `https://i.imgur.com/VaVmXgt.png`,
    sash: 'sash-danger',
    sash_icon: 'flash_on',
    sash_text: 'Popular'
  }
];

class HorizontalProducts extends React.Component {
  state = {
    products,
  };

  render() {
    return (
      <section className="container-fluid with-maxwidth-lg no-breadcrumbs chapter" >
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1">
            <div>
              {
                this.state.products.map((product, index) => (
                  <div className="item-card card__horizontal" key={index}>
                    <div className="card__image">
                      <a href="javascript:;">
                        <img alt="product" src={product.img} />
                      </a>
                    </div>
                    <div className="card__body card-white">
                      <div className="card__title">
                        <h4>{product.name}</h4>
                        <h6>Watch On Demand</h6>
                      </div>
                      <div className="card__price">
                        <span>By Garage Live Stream</span>
                      </div>
                      <div className="divider divider-solid divider-lg" />
                      <p className="card__desc">From the way it works to the way it looks, Live Tour isn’t just something you wear. It’s an essential part of who you are.</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </QueueAnim>
      </section>
    );
  }
}

module.exports = HorizontalProducts;
