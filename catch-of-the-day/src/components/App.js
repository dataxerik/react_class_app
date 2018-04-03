import React from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";
import PropTypes from "prop-types";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
    test: {}
  };

  static propTypes = {
    match: PropTypes.object,
  }

  componentDidMount() {
	const { params } = this.props.match;
	// first reinstate out localStorage
  const localStorageRef = localStorage.getItem(params.storeId);
  console.log(localStorageRef + " Local, order is " + this.state.order);
	if(localStorageRef) {
		this.setState({order: JSON.parse(localStorageRef)});
	}
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
	  localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
	  base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes }; //copy of existing state ... is an object spread.

    // 2. Add the new fish to the fishes variable (variable with the copied state)
    fishes[`fish${Date.now()}`] = fish;

    // 3. Update the state
    this.setState({
      fishes: fishes
    });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };

    // 2. Update taht state
    fishes[key] = updatedFish;

    // 3. SEt that to state
    this.setState({ fishes });
  }

  deleteFish = (key) => {
    // 1. Take a copy of current state
    const fishes = { ...this.state.fishes };

    // 2. Update the state
    fishes[key] = null;

    // 3. Update state
    this.setState({ fishes }); 
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;

    // 3. call setState to update our state object
    this.setState({ order });
  };

  removeFromOrder = key => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. remove item from order
    delete order[key];
    // 3. call setState to update our state object
    this.setState({ order });
  };

  render() {
    console.log(this.state);
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
