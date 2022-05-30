import React from 'react';
import { Link } from 'react-router-dom';
import Category from '../components/Category';
import Products from '../components/Products';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      queryToSearch: '',
      products: [],
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ queryToSearch: value });
  }

  handleSearchClick = async (event) => {
    event.preventDefault();
    const { queryToSearch } = this.state;
    const searchedProducts = await getProductsFromCategoryAndQuery(null, queryToSearch);
    this.setState({
      queryToSearch: '',
      products: searchedProducts.results,
    });
  }

  handleRadioClick = async ({ target: { id } }) => {
    this.setState({
      products: [],
    });
    const categoryProducts = await getProductsFromCategoryAndQuery(id, null);
    this.setState({
      products: categoryProducts.results,
    });
  }

  handleClickCart = (item) => {
    localStorage.setItem('idProduct', item.id);
  }

  render() {
    const { queryToSearch, products } = this.state;
    return (
      <div>
        <div>
          <Link to="/cart" data-testid="shopping-cart-button">
            Carrinho
          </Link>
          <input
            type="text"
            data-testid="query-input"
            value={ queryToSearch }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="query-button"
            onClick={ this.handleSearchClick }
          >
            Pesquisar
          </button>
          <Category
            handleRadioClick={ this.handleRadioClick }
          />
          { (products.length === 0)
            ? (
              <h3 data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </h3>
            )
            : (
              <h3>
                Produtos encontrados:
              </h3>
            )}
          <div>
            { (products.length === 0)
              ? <p>Nenhum produto foi encontrado</p>
              : products.map((product) => (
                <>
                  <Products
                    key={ product.id }
                    productName={ product.title }
                    productImage={ product.thumbnail }
                    productPrice={ product.price }
                    productId={ product.id }
                  />
                  <button
                    type="submit"
                    data-testid="product-add-to-cart"
                    onClick={ () => this.handleClickCart(product) }
                  >
                    Add To Cart
                  </button>
                </>
              )) }
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
