export async function getCategories() {
  // Implemente aqui
  const urlCategoriesApi = 'https://api.mercadolibre.com/sites/MLB/categories';
  try {
    const request = await fetch(urlCategoriesApi);
    const requestJson = request.json();
    return requestJson;
  } catch (error) {
    return error;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const urlProductsApi = 'https://api.mercadolibre.com/sites/MLB/search?category=';
  try {
    const request = await fetch(`${urlProductsApi}${categoryId}&q=${query}`);
    const requestJson = request.json();
    return requestJson;
  } catch (error) {
    return error;
  }
}
