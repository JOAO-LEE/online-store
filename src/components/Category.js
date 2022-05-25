import React from 'react';
import PropTypes from 'prop-types';

class Category extends React.Component {
  render() {
    const { categoryId, categoryName } = this.props;
    return (
      <label htmlFor={ categoryId } data-testid="category">
        <input type="radio" id={ categoryId } />
        { categoryName }
      </label>
    );
  }
}

Category.propTypes = {
  categoryId: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
};

export default Category;
