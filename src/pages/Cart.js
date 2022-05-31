import React from 'react';
import { getProductsFromId } from '../services/api';

class Cart extends React.Component {
  state = {
    haveItens: false,
    productOnCart: [],
    itensOnCart: 0,
    isButtonEnable: true,
  }

  componentDidMount() {
    this.getItemFromStorage();
  }

  increaseAndDecreaseQuantity = ({ target }) => {
    if (target.name === 'addToButton') {
      this.setState((prevState) => ({
        itensOnCart: prevState.itensOnCart + 1,
      }), this.isEnable);
    }
    if (target.name === 'removeButton') {
      this.setState((prevState) => ({
        itensOnCart: prevState.itensOnCart - 1,
      }), this.isEnable);
    }
  }

  isEnable = () => {
    const { itensOnCart } = this.state;
    if (itensOnCart <= 1) {
      this.setState({ isButtonEnable: true });
    } else {
      this.setState({ isButtonEnable: false });
    }
  }

  getItemFromStorage = async () => {
    if (localStorage.getItem('idProduct') !== null) {
      const id = localStorage.getItem('idProduct');
      const arrayOfId = id.split(',');
      arrayOfId.forEach(async (element) => {
        const product = await getProductsFromId(element);
        this.setState((prevState) => ({
          haveItens: true,
          productOnCart: [...prevState.productOnCart, product],
        }));
      });
      this.setState((prevState) => ({ itensOnCart: prevState.itensOnCart + 1 }));
    } else {
      this.setState({ haveItens: false });
    }
  }

  render() {
    const { haveItens,
      productOnCart,
      itensOnCart,
      isButtonEnable,
    } = this.state;
    if (!haveItens) {
      return (
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      );
    }
    return (
      <div>
        {productOnCart.map((product) => (
          <>
            <p data-testid="shopping-cart-product-name">{product.title}</p>
            <img src={ product.thumbnail } alt={ product.title } />
            <p>{product.price}</p>
            <p data-testid="shopping-cart-product-quantity">{itensOnCart}</p>
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
        ))}
      </div>
    );
  }
}

export default Cart;
