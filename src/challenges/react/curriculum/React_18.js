/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use PropTypes to Define the Props You Expect`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>React provides useful type-checking features to verify that components receive props of the correct type. For example, your application makes an API call to retrieve data that you expect to be in an array, which is then passed to a component as a prop. You can set <code>propTypes</code> on your component to require the data to be of type <code>array</code>. This will throw a useful warning when the data is of any other type.<br><br>

It's considered a best practice to set <code>propTypes</code> when you know the type of a prop ahead of time. You can define a <code>propTypes</code> property for a component in the same way you defined <code>defaultProps</code>. Here's an example to require the type <code>function</code> for a prop:<br><br>

<code>MyComponent.propTypes = { handleClick: React.PropTypes.func.isRequired }</code><br><br>

Notice that <code>func</code> represents <code>function</code>. Among the seven JavaScript primitive types, <code>function</code> and <code>boolean</code> (written as <code>bool</code>) are the only two that use unusual spelling.<br><br>

In addition to the primitive types, there are other types available. For example, you can check that a prop is a React element. Please refer to the documentation for all of the options.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Define <code>propTypes</code> for the <code>Items</code> component to check that the <code>quantity</code> prop is of type <code>number</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const Items = (props) => {
	return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
};

{ /* change code below this line */ }

{ /* change code above this line */ }

Items.defaultProps = {
	quantity: 0
};

class ShoppingCart extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
    return <Items />
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const Items = (props) => {
	return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
};

{ /* change code below this line */ }
Items.propTypes = {
	quantity: React.PropTypes.number.isRequired
};
{ /* change code above this line */ }

Items.defaultProps = {
	quantity: 0
};

class ShoppingCart extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
    return <Items />
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code should transpile successfully.';
	const error_1 = 'The ShoppingCart component should render.';
	const error_2 = 'The Items component should render.';
	const error_3 = 'The Items component should include a propTypes check that requires quantity to be a number.';

	let testResults = [
		{
			test: 0,
			status: false,
			condition: error_0
		},
		{
			test: 1,
			status: false,
			condition: error_1
		},
		{
			test: 2,
			status: false,
			condition: error_2
		},
		{
			test: 3,
			status: false,
			condition: error_3
		}
	];

	let es5, mockedComponent, passed = true;

	const exportScript = '\n export default ShoppingCart'
	const modifiedCode = code.concat(exportScript);

	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}

	// now we will try to shallow render the component with Enzyme's shallow method
	// you can also use mount to perform a full render to the DOM environment
	// to do this you must import mount above; i.e. import { shallow, mount } from enzyme
	try {
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(mockedComponent.find('ShoppingCart').length, 1, error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.find('Items').length, 1, error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		// propTypes unavailable in production and throw warnings anyway
		// this was the only way I could devise to check that propTypes are included
		const noWhiteSpace = modifiedCode.replace(/\s/g, '');
		const verifyPropTypes = 'Items.propTypes={quantity:React.PropTypes.number.isRequired}';
		assert.strictEqual(noWhiteSpace.includes(verifyPropTypes), true, error_3);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}


	return {
		passed,
		testResults
	}

}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

	try {
		const exportScript = '\n export default ShoppingCart'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}
