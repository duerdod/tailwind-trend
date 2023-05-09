import queries from '@jetshop/core/data/queries/ProductLists.gql';
import mutations from '@jetshop/core/data/mutations/productListMutations.gql';
import * as ProductListQueries from './ProductLists.gql';

export const productListQueries = {
  createList: mutations.CreateProductList,
  deleteList: mutations.DeleteProductList,
  all: queries.ProductLists,
  query: ProductListQueries.ProductList,
  productsQuery: ProductListQueries.ProductsFromProductList,
  add: ProductListQueries.AddToProductList,
  login: ProductListQueries.MergeProductLists,
  update: ProductListQueries.UpdateProductListItem,
  remove: ProductListQueries.RemoveFromProductList
};
