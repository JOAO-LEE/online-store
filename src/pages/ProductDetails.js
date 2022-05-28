import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromId } from '../services/api';

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

  render() {
    const { productInfos } = this.state;

    return (
      <div data-testid="product-detail-name">
        <Link to="/cart">
          <input type="button" value="Carrinho" />
        </Link>
        <p>{productInfos.title}</p>
        <img src={ productInfos.thumbnail } alt={ productInfos.title } />
        <p>{`R$${productInfos.price}`}</p>
      </div>
    );
  }
}

// nao sei dizer o motivo de estar gerando erro no console log...
ProductDetails.propTypes = {
  match: PropTypes.shape.isRequired,
};

export default ProductDetails;
