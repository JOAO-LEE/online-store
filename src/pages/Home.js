import React from 'react';
import { Link } from 'react-router-dom';
import Category from '../components/Category';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  componentDidMount = async () => {
    const allCategories = await getCategories();
    this.setState({
      categories: allCategories,
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
        <input type="text" />
        <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
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
