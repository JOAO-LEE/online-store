import React from 'react';
import PropTypes from 'prop-types';

class Products extends React.Component {
  render() {
    const { productName, productImage, productPrice } = this.props;
    return (
      <div data-testid="product">
        <p>{ productName }</p>
        <img src={ productImage } alt={ productName } />
        <p>{ productPrice }</p>
      </div>
    );
  }
}

Products.propTypes = {
  productName: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
};

export default Products;
