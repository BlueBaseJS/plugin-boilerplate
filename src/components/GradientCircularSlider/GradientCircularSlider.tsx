import CircularSlider, {
	BaseCircularSliderProps,
	CircularSliderDefaultProps,
} from '../CircularSlider';

import { ColorTrack } from './ColorTrack';
import React from 'react';

export interface GradientCircularSliderProps
	extends Omit<BaseCircularSliderProps, 'MaximumTrackComponent' | 'MinimumTrackComponent'> {
	colors: string[];

	MaximumTrackComponent: React.ComponentType<GradientCircularSliderProps>;
	MinimumTrackComponent: React.ComponentType<GradientCircularSliderProps>;
}

export const GradientCircularSlider = (props: GradientCircularSliderProps) => {
	return <CircularSlider {...(props as any)} />;
};

const defaultProps: Partial<GradientCircularSliderProps> = {
	...(CircularSliderDefaultProps as any),
	MaximumTrackComponent: ColorTrack,
	MinimumTrackComponent: () => null,
	trackWidth: 12,
};

GradientCircularSlider.defaultProps = defaultProps;
GradientCircularSlider.displayName = 'GradientCircularSlider';
