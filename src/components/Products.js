import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Products extends React.Component {
  render() {
    const { productName, productImage, productPrice, productId } = this.props;
    return (
      <div data-testid="product">
        <Link
          to={ `/productdetails/${productId}` }
          data-testid="product-detail-link"
        >
          <p>{productName}</p>
          <img src={ productImage } alt={ productName } />
          <p>{productPrice}</p>
        </Link>
      </div>
    );
  }
}

Products.propTypes = {
  productName: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
};

export default Products;
