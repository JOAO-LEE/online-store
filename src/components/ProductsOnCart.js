import React from 'react';
import PropTypes from 'prop-types';

class ProductsOnCart extends React.Component {
  state = {
    quantity: 1,
    isButtonEnable: true,
  }

  increaseAndDecreaseQuantity = ({ target }) => {
    if (target.name === 'addToButton') {
      this.setState((prevState) => ({
        quantity: prevState.quantity + 1,
      }), this.isEnable);
    }
    if (target.name === 'removeButton') {
      this.setState((prevState) => ({
        quantity: prevState.quantity - 1,
      }), this.isEnable);
    }
  }

  isEnable = () => {
    const { quantity } = this.state;
    if (quantity <= 1) {
      this.setState({ isButtonEnable: true });
    } else {
      this.setState({ isButtonEnable: false });
    }
  }

  render() {
    const { isButtonEnable, quantity } = this.state;
    const { productTitle,
      productThumbnail,
      productPrice } = this.props;

    return (
      <>
        <p data-testid="shopping-cart-product-name">{productTitle}</p>
        <img src={ productThumbnail } alt={ productTitle } />
        <p>{`R$${productPrice}`}</p>
        <p data-testid="shopping-cart-product-quantity">
          {`Quantity: ${quantity} unit(s)`}
        </p>
        <input
          disabled={ isButtonEnable }
          name="removeButton"
          type="button"
          value="-"
          onClick={ this.increaseAndDecreaseQuantity }
          data-testid="product-decrease-quantity"
        />
        <input
          name="addToButton"
          type="button"
          value="+"
          onClick={ this.increaseAndDecreaseQuantity }
          data-testid="product-increase-quantity"
        />
      </>
    );
  }
}

ProductsOnCart.propTypes = {
  productTitle: PropTypes.string.isRequired,
  productThumbnail: PropTypes.string.isRequired,
  productPrice: PropTypes.string.isRequired,
};

export default ProductsOnCart;
