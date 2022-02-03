export function getInRange(value: number, maximumValue: number, minimumValue: number) {
	if (value > maximumValue) {
		return maximumValue;
	}
	if (value < minimumValue) {
		return minimumValue;
	}
	return value;
}

export interface SliderPosition {
	x?: number;
	y?: number;
	width: number;
	height: number;
}

export function valueToPosition(opts: {
	inverted: boolean;
	value: number;
	value2?: number;
	maximumValue: number;
	minimumValue: number;
	width?: number;
	height?: number;
	vertical: boolean;
	trackWidth: number;
}): SliderPosition {
	const {
		vertical,
		inverted,
		value,
		value2,
		maximumValue,
		minimumValue,
		trackWidth,
		height = 0,
		width = 0,
	} = opts;

	const v1 = getInRange(value, maximumValue, minimumValue);
	const v2 = value2 === undefined ? value2 : getInRange(value2, maximumValue, minimumValue);
	const widthOrHeight = !vertical ? width : height;

	const x1 = ((v1 - minimumValue) / (maximumValue - minimumValue)) * widthOrHeight;

	// Single Handle
	if (v2 === undefined) {
		// Horizontal
		if (!vertical) {
			return {
				height: trackWidth,
				width: x1,
				x: inverted ? width - x1 : 0,
				y: undefined,
			};
		}

		// Vertical
		return {
			height: x1,
			width: trackWidth,
			x: undefined,
			y: inverted ? 0 : height - x1,
		};
	}

	// 2 Handles

	const size = ((v2 - v1) / maximumValue) * widthOrHeight;

	// Horizontal
	if (!vertical) {
		return {
			height: trackWidth,
			width: size,
			x: inverted ? width - (v2 / maximumValue) * widthOrHeight : x1,
			y: undefined,
		};
	}

	// Vertical
	return {
		height: size,
		width: trackWidth,
		x: undefined,
		y: inverted ? x1 : height - size - x1,
	};
}

export function positionToValue({
	vertical,
	inverted,
	maximumValue,
	minimumValue,
	step,
	moveX,
	moveY,
	parentLayout,
}: {
	vertical: boolean;
	inverted: boolean;
	maximumValue: number;
	minimumValue: number;
	moveX: number;
	moveY: number;
	parentLayout: SliderPosition;
	step: number;
}) {
	const { height, width, x = 0, y = 0 } = parentLayout;

	let value;

	if (!vertical) {
		const posX = getInRange(moveX, x + width, x);
		const percentage = (posX - x) / width;
		value = minimumValue + (maximumValue - minimumValue) * (inverted ? 1 - percentage : percentage);
	} else {
		const posY = getInRange(moveY, y + height, y);
		const percentage = (posY - y) / height;
		value = minimumValue + (maximumValue - minimumValue) * (inverted ? percentage : 1 - percentage);
	}

	return roundValueToStep(value, step, minimumValue);
}

export function getDecimalPrecision(num: number) {
	// This handles the case when num is very small (0.00000001), js will turn this into 1e-8.
	// When num is bigger than 1 or less than -1 it won't get converted to this notation so it's fine.
	if (Math.abs(num) < 1) {
		const parts = num.toExponential().split('e-');
		const matissaDecimalPart = parts[0].split('.')[1];
		return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
	}

	const decimalPart = num.toString().split('.')[1];
	return decimalPart ? decimalPart.length : 0;
}

export function roundValueToStep(value: number, step: number, minimumValue: number) {
	if (step === 0) {
		return value;
	}

	const nearest = Math.round((value - minimumValue) / step) * step + minimumValue;
	return Number(nearest.toFixed(getDecimalPrecision(step)));
}
