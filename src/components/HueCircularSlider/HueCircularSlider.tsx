import GradientCircularSlider, { GradientCircularSliderProps } from '../GradientCircularSlider';

import React from 'react';

export interface HueCircularSliderProps extends GradientCircularSliderProps {}

export const HueCircularSlider = (props: HueCircularSliderProps) => {
	return <GradientCircularSlider {...props} />;
};

const defaultProps: Partial<HueCircularSliderProps> = {
	colors: ['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#f00'],
	maximumValue: 360,
	minimumValue: 0,
	step: 1,
	trackWidth: 12,
};

HueCircularSlider.defaultProps = defaultProps;
