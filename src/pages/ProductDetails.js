import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromId } from '../services/api';

// adicionar button de add to cart (input estilo button com listener onClick que ira chamar uma function adicionando o produto ao carrinho).
// ao clicar no button, adicionar o produto ao state e passar esse state como props para a page Cart.

class ProductDetails extends React.Component {
  state = {
    productInfos: {},
  }

  componentDidMount() {
    this.getProductFromApi();
  }

  getProductFromApi = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProductsFromId(id);
    this.setState({ productInfos: product });
  }

  handleClickCart = () => {
    const { productInfos } = this.state;
    localStorage.setItem('idProduct', productInfos.id);
  }

  render() {
    const { productInfos } = this.state;

    return (
      <div data-testid="product-detail-name">
        <Link to="/cart">
          <input
            type="button"
            value="Carrinho"
            data-testid="shopping-cart-button"
          />
        </Link>
        <p>{productInfos.title}</p>
        <img src={ productInfos.thumbnail } alt={ productInfos.title } />
        <p>{`R$${productInfos.price}`}</p>
        <input
          type="button"
          value="Add to cart"
          onClick={ this.handleClickCart }
          data-testid="product-detail-add-to-cart"
        />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetails;
