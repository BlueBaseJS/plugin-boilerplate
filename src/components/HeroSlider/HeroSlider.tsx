import { View, ViewStyle } from 'react-native';
import { getComponent, isMobile } from '@bluebase/core';

import { MediaSliderProps } from '../MediaSlider';
import { MediaType } from '../Media/Media';
import React from 'react';
import { SwipeableViewsProps } from '../../lib/react-swipeable-views';
import { useComponentLayout } from './useComponentLayout';

// const ProgressiveImage = getComponent('ProgressiveImage', 'BlueBaseImage');
const MediaSlider = getComponent<MediaSliderProps>('MediaSlider');

export interface HeroSliderStyles {
	root: ViewStyle;
	slideContainer: ViewStyle;
	slide: ViewStyle;
	pagination: ViewStyle;
}

export interface HeroSliderProps extends SwipeableViewsProps {
	/** Media items */
	webItems: MediaType[];

	mobileItems: MediaType[];

	/** Displays a loading state if true */
	loading?: boolean;
}

export const HeroSlider = (props: HeroSliderProps) => {
	const { layout, onLayout } = useComponentLayout();
	const { webItems, mobileItems } = props;

	function adjustHeight(width: number) {
		const heightweb = width * (700 / 1920);
		return heightweb;
	}
	function adjustHeightMobile(width: number) {
		const heightmobile = width * (400 / 600);
		return heightmobile;
	}

	const items = isMobile() ? mobileItems : webItems;
	const height = isMobile() ? adjustHeightMobile(layout.width) : adjustHeight(layout.width);

	return (
		<View testID="hero-slider-container" onLayout={onLayout}>
			{layout.width > 0 ? <MediaSlider items={items} height={height} /> : null}
		</View>
	);
};

export default HeroSlider;
