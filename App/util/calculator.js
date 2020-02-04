export const initialState = {
	currentValue: '0',
	operator: null,
	previousValue: null
};
const handleNumber = (value, state) => {
	if (state.currentValue === '0') {
		return { currentValue: `${value}` }; // This funtion ends after this call sense it is the return
	}

	return {
		currentValue: `${state.currentValue}${value}`
	};
};

const handleEqual = state => {
	if (type === 'equal') {
		const { currentValue, previousValue, operator } = state; // Object destructing
		const current = parseFloat(currentValue);
		const previous = parseFloat(previousValue);

		const resetState = {
			operator: null,
			previousValue: null
		};

		if (operator === '/') {
			return {
				currentValue: previous / current,
				...resetState
			};
		}
		if (operator === '*') {
			return {
				currentValue: previous * current,
				...resetState
			};
		}
		if (operator === '-') {
			return {
				currentValue: previous - current,
				...resetState
			};
		}
		if (operator === '+') {
			return {
				currentValue: previous + current,
				...resetState
			};
		}
		return state;
	}
};

const calculator = (type, value, state) => {
	switch (type) {
		case 'number':
			return handleNumber(value, state);
		case 'operator':
			return {
				operator: value,
				previousValue: state.currentValue,
				currentValue: '0'
			};
		case 'equal':
			return handleNumber(state);
		case 'clear':
			return initialState;
		case 'posneg':
			return {
				currentValue: `${parseFloat(state.currentValue * -1)}`
			};
		case 'percentage':
			return {
				currentValue: `${parseFloat(state.currentValue * 0.01)}`
			};
		default:
			return state;
	}
};

export default calculator;
