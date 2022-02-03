import { FlatList, FlatListProps, ViewStyle } from 'react-native';
import { ListCarouselToolbar, ListCarouselToolbarProps } from './ListCarouselToolbar';
import React, { useCallback, useRef } from 'react';

import { GraphqlListProps } from '../GraphqlList';
import { Theme } from '@bluebase/core';
import { View } from '@bluebase/components';
import get from 'lodash.get';

export interface ListCarouselStyles {
	root: ViewStyle;
	gridContentContainerStyle: ViewStyle;
}

export interface ListCarouselProps<T = any>
	extends Partial<GraphqlListProps<T>>,
		Omit<ListCarouselToolbarProps, 'styles' | 'moveBack' | 'moveNext'> {
	/**
	 * A component that uses GraphqlList. Example: ThingGrid, PlaceGrid, etc
	 */
	GraphqlListComponent: React.ComponentType<Partial<GraphqlListProps>>;

	/**
	 * Base FlatList component. Used to extract ref from
	 */
	BaseListComponent?: React.ComponentType<FlatListProps<T>>;

	style?: ViewStyle;
	styles?: Partial<ListCarouselStyles>;
}

export const ListCarousel = (props: ListCarouselProps) => {
	const {
		title,
		description,
		left,
		right,
		loading,
		style,
		styles: _styles,
		BaseListComponent: _BaseListComponent,
		GraphqlListComponent,
		...rest
	} = props;

	const styles = _styles!;
	const BaseListComponent = _BaseListComponent!;

	const list = useRef<FlatList<any>>(null);
	const ListWithRef = useCallback((p: any) => <BaseListComponent {...p} ref={list} />, []);

	let numColumns = 6;
	let index = 0;

	/**
	 * Set index next to viewed items
	 */
	function moveNext() {
		if (!list.current) {
			return;
		}

		const listSize = get(list, 'current.props.data', []).length;
		const newIndex = index + numColumns;

		list.current.scrollToIndex({ animated: true, index: newIndex - 1 });
		return newIndex > listSize - 1 ? listSize - 1 : newIndex;
	}

	/**
	 * Set index back to viewed items
	 */
	function moveBack() {
		if (!list.current) {
			return;
		}

		index = index - numColumns > 0 ? index - numColumns : 0;

		if (index > 0) {
			list.current.scrollToIndex({ animated: true, index });
		} else {
			list.current.scrollToOffset({ animated: true, offset: 0 });
		}
		return index;
	}

	/**
	 * Set index if manually scrolling
	 */
	const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
		numColumns = viewableItems.length;
		if (viewableItems.length > 0) {
			index = viewableItems[0].index;
		}

		return index;
	}, []);

	return (
		<View style={{ ...styles.root, ...style }}>
			<ListCarouselToolbar
				title={title}
				description={description}
				left={left}
				right={right}
				loading={loading}
				moveBack={moveBack}
				moveNext={moveNext}
			/>
			<GraphqlListComponent
				horizontal
				loading={loading}
				scrollEnabled={!loading}
				contentContainerStyle={styles.gridContentContainerStyle}
				onViewableItemsChanged={onViewableItemsChanged}
				ListComponent={ListWithRef}
				// placeholderItems={numColumns}
				{...rest}
			/>
		</View>
	);
};

ListCarousel.defaultProps = {
	BaseListComponent: FlatList,
};

ListCarousel.defaultStyles = (theme: Theme): ListCarouselStyles => ({
	root: {},

	gridContentContainerStyle: {
		padding: 0,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit,
	},
});
