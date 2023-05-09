import { Component } from 'react';

export default class QuantityContainer extends Component {
  state = {
    qty: 1
  };

  setQuantity = qty => {
    // Ensure negative numbers can't be added
    const limitedQty = qty < 1 ? 1 : qty;
    this.setState({ qty: limitedQty });
  };

  render() {
    return this.props.children({
      quantity: this.state.qty,
      setQuantity: this.setQuantity
    });
  }
}
