import React from 'react';
import { getProductsFromId } from '../services/api';

class Cart extends React.Component {
  state = {
    haveItens: false,
    productOnCart: null,
    itensOnCart: 0,
  }

  componentDidMount() {
    this.getItemFromStorage();
  }

  getItemFromStorage = async () => {
    if (localStorage.getItem('idProduct') !== null) {
      const id = localStorage.getItem('idProduct');
      const product = await getProductsFromId(id);
      this.setState({ haveItens: true, productOnCart: product });
      this.setState((prevState) => ({
        itensOnCart: prevState.itensOnCart + 1,
      }));
    } else {
      this.setState({ haveItens: false });
    }
  }

  render() {
    const { haveItens,
      productOnCart,
      itensOnCart,
    } = this.state;
    if (!haveItens) {
      return (
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      );
    }
    return (
      <>
        <h4 data-testid="shopping-cart-product-name">{productOnCart.title}</h4>
        <img src={ productOnCart.thumbnail } alt={ productOnCart.title } />
        <p>{`R$${productOnCart.price}`}</p>
        <p
          data-testid="shopping-cart-product-quantity"
        >
          {`Itens on cart: ${itensOnCart} units`}
        </p>
      </>
    );
  }
}

export default Cart;
