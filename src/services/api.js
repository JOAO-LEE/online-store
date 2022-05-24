// site com as disposições da API do Mercado Livre: https://developers.mercadolivre.com.br/pt_br/categorias-e-publicacoes

export async function getCategories() {
  // site utilizado para pesquisa do endpoint da API: https://api.mercadolibre.com/sites/MLB/categories
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
  // site utilizado para pesquisa do endpoint da API: https://api.mercadolibre.com/sites/MLB/search?category=category1&q=my-query#json
  const urlProductsApi = 'https://api.mercadolibre.com/sites/MLB/search?category=';
  try {
    const request = await fetch(`${urlProductsApi}${categoryId}&q=${query}`);
    const requestJson = request.json();
    return requestJson;
  } catch (error) {
    return error;
  }
}
