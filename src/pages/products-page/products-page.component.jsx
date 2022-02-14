import React from "react";
import api from "../../utils/api";
import Product from "../../components/product";

export default class ProductsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: true,
      isErrored: false,
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }
  fetchProducts = () => {
    api
      .get("/product/all")
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            products: response.data.products,
            isLoading: false,
          });
        } else {
          throw new Error(
            `Error getting data. Response status ${response.status}`
          );
        }
      })
      .catch((error) => {
        console.error("there was error getting products. ", error);
        this.setState({
          isLoading: false,
          isErrored: true,
        });
      });
  };

  render() {
    const { products } = this.state;
    return (
      <>
        {products.map((product) => (
          <Product value={product} key={product._id} />
        ))}
      </>
    );
  }
}
