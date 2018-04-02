import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
	static propTypes = {
		history: PropTypes.object,
	}
	//constructor() {
	//	super();
	//	this.goToStore = this.goToStore.bind(this);
	//}
	myInput = React.createRef();
	
	//goToStore(event) {
	//	event.preventDefault();
	//}
	
	goToStore = event => {
		event.preventDefault();
		const storeName = this.myInput.value.value;
		
		this.props.history.push(`/store/${storeName}`);
	}
	render() {
		//return <p>I am the store picker!</p>
		//return React.createElement('p', { className: 'Hey'}, 'Heyyooo');
		//return <form className='store-select'></form> //need a className instead of class
		return (
			<React.Fragment>
				<p>Fish!</p>
				<form className="store-selector" onSubmit={this.goToStore}>
				{ /* comment */ }
					<h2>Please Enter A Store</h2>
					<input type='text' ref={this.myInput} required placeholder="Store Name" defaultValue={getFunName()}/>
					<button type='submit'>Visit Store -></button>
				</form>
			</React.Fragment>
		) // use () for better formatting
 	}
}

export default StorePicker;