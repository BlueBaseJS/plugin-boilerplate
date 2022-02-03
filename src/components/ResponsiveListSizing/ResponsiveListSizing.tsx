import { ResponsiveListSizingData, useResponsiveListSizes } from '../../hooks';

import React from 'react';
import { View } from 'react-native';
import { renderChildrenWithProps } from '@bluebase/core';

export interface ResponsiveListSizingProps {
	children: (data: ResponsiveListSizingData) => React.ReactNode;

	/**
	 * Grid Columns
	 * Number of columns to show based on size
	 */
	columnMap?: {
		xs: number;
		sm: number;
		md: number;
		lg: number;
		xl: number;
	};
}

/**
 * Shows different number of items in the gird based on the screen size.
 */
export const ResponsiveListSizing = (props: ResponsiveListSizingProps) => {
	// const { layout, onLayout } = useComponentLayout();
	const { sizes, onLayout } = useResponsiveListSizes(props.columnMap);

	return (
		<View testID="list-sizing-main" onLayout={onLayout} style={{ flex: 1 }}>
			{sizes.numColumns > 0 ? renderChildrenWithProps(props.children, sizes) : null}
		</View>
	);
};
