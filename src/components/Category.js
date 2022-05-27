import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Category extends React.Component {
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
    const { handleRadioClick } = this.props;
    return (
      <fieldset>
        {categories.map((category) => (
          <label
            htmlFor={ category.id }
            data-testid="category"
            key={ category.id }
          >
            <input
              type="radio"
              name="categories"
              id={ category.id }
              onChange={ handleRadioClick }
            />
            { category.name }
          </label>
        ))}
      </fieldset>
    );
  }
}

Category.propTypes = {
  handleRadioClick: PropTypes.func.isRequired,
};

export default Category;
