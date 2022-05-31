import React from 'react';
import ProductsOnCart from '../components/ProductsOnCart';

class Cart extends React.Component {
  state = {
    haveItens: false,
    productOnCart: [],
  }

  componentDidMount() {
    this.getItemFromStorage();
  }

  getItemFromStorage = async () => {
    if (localStorage.getItem('idProduct') !== null) {
      const product = JSON.parse(localStorage.getItem('idProduct'));
      this.setState({
        haveItens: true,
        productOnCart: product,
      });
    } else {
      this.setState({ haveItens: false });
    }
  }

  render() {
    const { haveItens,
      productOnCart,
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
          <ProductsOnCart
            key={ product.id }
            productTitle={ product.title }
            productThumbnail={ product.thumbnail }
            productPrice={ product.price }
          />
        ))}
      </div>
    );
  }
}

export default Cart;
