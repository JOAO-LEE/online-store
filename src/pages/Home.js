import React from 'react';
import { Link } from 'react-router-dom';
import Category from '../components/Category';
import Products from '../components/Products';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      queryToSearch: '',
      categories: [],
      products: [],
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ queryToSearch: value });
  }

  handleClick = async (event) => {
    event.preventDefault();
    const { queryToSearch } = this.state;
    const searchedProducts = await getProductsFromCategoryAndQuery(null, queryToSearch);
    this.setState({
      queryToSearch: '',
      products: searchedProducts.results,
    });
  }

  componentDidMount = async () => {
    const allCategories = await getCategories();
    this.setState({
      categories: allCategories,
    });
  }

  render() {
    const { queryToSearch, categories, products } = this.state;
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
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
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
                <Products
                  key={ product.id }
                  productName={ product.title }
                  productImage={ product.thumbnail }
                  productPrice={ product.price }
                />
              )) }
          </div>
        </div>
        <div>
          {categories.map((category) => (
            <Category
              key={ category.id }
              categoryId={ category.id }
              categoryName={ category.name }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
