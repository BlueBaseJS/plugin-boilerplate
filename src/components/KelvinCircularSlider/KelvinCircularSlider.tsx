import GradientCircularSlider, { GradientCircularSliderProps } from '../GradientCircularSlider';

import React from 'react';

//  ///////// kelvin start
// https://github.com/jaames/iro.js

const KELVIN_MIN = 1000;
const KELVIN_MAX = 40000; // Math shorthands

/**
 * @desc Clamp a number between a min and max value
 * @param num - input value
 * @param min - min allowed value
 * @param max - max allowed value
 */

function clamp(num: number, min: number, max: number) {
	return Math.min(Math.max(num, min), max);
}

/**
 * @desc Convert a kelvin temperature to an approx, RGB value
 * @param kelvin - kelvin temperature
 */

function kelvinToRgb(kelvin: number) {
	const temp = kelvin / 100;
	let r: number, g: number, b: number;

	if (temp < 66) {
		r = 255;
		g =
			-155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * Math.log(g);
		b =
			temp < 20
				? 0
				: -254.76935184120902 +
				  0.8274096064007395 * (b = temp - 10) +
				  115.67994401066147 * Math.log(b);
	} else {
		r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * Math.log(r);
		g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * Math.log(g);
		b = 255;
	}

	return {
		r: clamp(Math.floor(r), 0, 255),
		// tslint:disable-next-line: object-literal-sort-keys
		g: clamp(Math.floor(g), 0, 255),
		b: clamp(Math.floor(b), 0, 255),
	};
}

function getColors(min: number = KELVIN_MIN, max: number = KELVIN_MAX) {
	const stops = [];

	const numStops = 8;
	const range = max - min;

	for (let kelvin = min, stop = 0; kelvin < max; kelvin += range / numStops, stop += 1) {
		const ref = kelvinToRgb(kelvin);
		const r = ref.r;
		const g = ref.g;
		const b = ref.b;
		// stops.push([(100 / numStops) * stop, `rgb(${r},${g},${b})`]);
		stops.push(`rgb(${r},${g},${b})`);
	}

	return stops;
}
//  ///////// kelvin end

export interface KelvinCircularSliderProps extends GradientCircularSliderProps {}

export const KelvinCircularSlider = (props: KelvinCircularSliderProps) => {
	return (
		<GradientCircularSlider {...props} colors={getColors(props.minimumValue, props.maximumValue)} />
	);
};

const defaultProps: Partial<KelvinCircularSliderProps> = {
	maximumValue: KELVIN_MAX,
	minimumValue: KELVIN_MIN,
	step: 100,
	trackWidth: 12,
};

KelvinCircularSlider.defaultProps = defaultProps;
