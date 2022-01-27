export * from './react-swipeable-views';
export { SwipeableViews as default } from './react-swipeable-views';

import { Omit } from '@bluebase/core';
import { SwipeableViewsProps as Props } from 'react-swipeable-views';
import { ViewStyle } from 'react-native';

export interface SwipeableAutoPlayViewsProps {
	/**
	 * If `false`, the auto play behavior is disabled.
	 */
	autoplay?: boolean;
	/**
	 * This is the auto play direction.
	 */
	direction?: 'incremental' | 'decremental';
	/**
	 * Delay between auto play transitions (in ms).
	 */
	interval?: number;
}

export interface SwipeableViewsProps
	extends SwipeableAutoPlayViewsProps,
		Omit<Props, 'containerStyle' | 'style' | 'slideStyle'> {
	containerStyle?: ViewStyle;
	style?: ViewStyle;
	slideStyle?: ViewStyle;
}
