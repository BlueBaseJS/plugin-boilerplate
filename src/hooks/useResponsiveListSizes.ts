import { getScreenSizeFromWidth, useTheme } from '@bluebase/core';

import { useComponentLayout } from './useComponentLayout';

// tslint:disable: object-literal-sort-keys
export const MAX_CONTAINER_WIDTH = {
	xs: '100%',
	sm: 540,
	md: 720,
	lg: 960,
	xl: 1140,
};

/**
 * Grid Columns
 * Number of columns to show based on size
 */
export interface ResponsiveListSizesColumnMap {
	xs: number;
	sm: number;
	md: number;
	lg: number;
	xl: number;
}

export interface ResponsiveListSizingData {
	numColumns: number;
	itemWidth: number;
	itemPadding: number;
	containerPadding: number;
	containerWidth: string | number;
}

const DefaultColumnMap = {
	xs: 2,
	sm: 3,
	md: 4,
	lg: 6,
	xl: 6,
};

/**
 * Calculates the grid item sizes dynamically based on screen size
 */
export function useResponsiveListSizes(
	// layout: LayoutRectangle,
	columnMap: ResponsiveListSizesColumnMap = DefaultColumnMap
) {
	const { theme } = useTheme();
	const { layout, onLayout } = useComponentLayout();

	if (layout.width === 0) {
		return {
			onLayout,
			sizes: {
				containerPadding: 0,
				containerWidth: 0,
				itemPadding: 0,
				itemWidth: 0,
				numColumns: 0,
			},
		};
	}

	const spacing = theme.spacing.unit;
	const componentWidth = layout.width;
	const screenSize = getScreenSizeFromWidth(componentWidth);

	const numColumns = columnMap[screenSize];
	const containerWidth = MAX_CONTAINER_WIDTH[screenSize];
	const containerSize = typeof containerWidth === 'string' ? componentWidth : containerWidth;
	const itemWidth = (containerSize - spacing * 2 * (numColumns + 1)) / numColumns;

	const sizes: ResponsiveListSizingData = {
		containerPadding: spacing,
		containerWidth,
		itemPadding: spacing,
		itemWidth,
		numColumns,
	};

	return { sizes, onLayout };
}
