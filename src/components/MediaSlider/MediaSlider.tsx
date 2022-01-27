import { Fade, Placeholder, PlaceholderMedia } from 'rn-placeholder';
import { Media, MediaType } from '../Media/Media';
import React, { useState } from 'react';
import { SwipeableViews, SwipeableViewsProps } from '../../lib/react-swipeable-views';
import { View, ViewStyle } from 'react-native';
import { useStyles, useTheme } from '@bluebase/core';

import LinkChildrenIfPossible from '../LinkChildrenIfPossible';
import { LinkProps } from '@bluebase/components';
import { OnSwitchingCallbackTypeDescriptor } from 'react-swipeable-views';
import { Pagination } from './Pagination';
import { useComponentLayout } from './useComponentLayout';

// const ProgressiveImage = getComponent('ProgressiveImage', 'BlueBaseImage');

export interface MediaSliderStyles {
	root: ViewStyle;
	slideContainer: ViewStyle;
	slide: ViewStyle;
	pagination: ViewStyle;
}

export interface MediaSliderProps extends SwipeableViewsProps {
	/** Media items */
	items: MediaType[];

	/** Height of media */
	height: number;

	/** Displays a loading state if true */
	loading?: boolean;

	// Route params
	routeName?: LinkProps['routeName'];
	path?: LinkProps['path'];
	onPress?: LinkProps['onPress'];
	params?: LinkProps['params'];

	style?: ViewStyle;
	styles?: Partial<MediaSliderStyles>;
}

export const MediaSlider = (props: MediaSliderProps) => {
	const { items, height, loading, routeName, path, onPress, params, style, ...rest } = props;
	const { layout, onLayout } = useComponentLayout();
	const [index, setIndex] = useState(0);
	const { theme } = useTheme();

	const styles = useStyles<MediaSliderStyles>('MediaSlider', props, {
		root: {
			overflow: 'hidden',
			// position: 'relative',
		},

		slideContainer: {
			// height: 100,
		},

		slide: {
			// height: 100,
		},

		pagination: {
			alignSelf: 'center',
			bottom: theme.spacing.unit,
			position: 'absolute',
		},
	});

	const rootStyles = { ...styles!.root, minHeight: height, ...style };
	const sliderStyles = { ...styles!.slideContainer, height };

	if (loading === true) {
		return (
			<View style={rootStyles} testID="media-slider-container">
				<Placeholder Animation={Fade}>
					<PlaceholderMedia isRound={false} style={{ width: '100%', ...sliderStyles }} />
				</Placeholder>
			</View>
		);
	}

	function handleSwitching(i: number, type: OnSwitchingCallbackTypeDescriptor) {
		if (type === 'end') {
			setIndex(i);
		}
	}

	return (
		<View style={rootStyles} testID="media-slider-container" onLayout={onLayout}>
			{layout.width > 0 ? (
				<React.Fragment>
					<SwipeableViews
						style={sliderStyles}
						index={index}
						{...rest}
						onChangeIndex={setIndex}
						onSwitching={handleSwitching}
					>
						{items.map((item, i) => (
							<LinkChildrenIfPossible key={i} {...{ routeName, path, onPress, params }} style={{ flex: 1 }}>
								<Media key={i} {...item} style={{ width: layout.width, height: layout.height }} />
							</LinkChildrenIfPossible>
						))}
					</SwipeableViews>
					<Pagination
						small
						dots={items.length}
						index={index}
						onChangeIndex={setIndex}
						style={styles!.pagination}
					/>
				</React.Fragment>
			) : null}
		</View>
	);
};

export default MediaSlider;
