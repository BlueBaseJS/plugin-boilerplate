import { FlatList, TextInput, View } from '@bluebase/components';
import { ListRenderItemInfo, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import { Theme, applyStyles } from '@bluebase/core';

import { MultiLevelSelectorItem } from './MultiLevelSelector';
import { MultiLevelSelectorListItem } from './ListItem';

export interface MultiLevelSelectorListStyles {
	root: ViewStyle;
	toolbar: ViewStyle;
	searchWrapper: ViewStyle;
}

export interface MultiLevelSelectorListProps {
	items: MultiLevelSelectorItem[];
	loading?: boolean;
	searchable?: boolean;
	showCount?: boolean;
	onChangeValue?: (item: MultiLevelSelectorItem) => void;
	style?: ViewStyle;
	styles?: Partial<MultiLevelSelectorListStyles>;
}

const searchFn = (query = '', items: MultiLevelSelectorItem[]) => {
	const q = query.toLowerCase();

	return items.filter(item => {
		if (!query || query === '') {
			return true;
		}

		return (item.title || '').toLowerCase().startsWith(q);
	});
};

export const MultiLevelSelectorListComponent = (props: MultiLevelSelectorListProps) => {
	const { onChangeValue, searchable, showCount, loading, styles, style } = props;

	const renderItem = ({ item }: ListRenderItemInfo<MultiLevelSelectorItem>) => {
		const itemOnPress = () => {
			if (onChangeValue) {
				onChangeValue(item);
			}
		};

		return (
			<MultiLevelSelectorListItem
				{...item}
				key={item.id}
				onPress={itemOnPress}
				showCount={showCount}
				loading={loading}
			/>
		);
	};

	const [query, search] = useState('');
	const data = searchFn(query, props.items);

	const showSearch = !!searchable;
	const showToolbar = showSearch;

	const keyExtractor = (item: MultiLevelSelectorItem, index: number) => item.id || String(index);

	return (
		<View style={{ ...styles!.root, ...style }}>
			{showToolbar ? (
				<View testID="filter-facet-list-toolbar" style={styles!.toolbar}>
					{showSearch && (
						<View style={styles!.searchWrapper}>
							<TextInput placeholder="Search" value={query} onChangeText={search} />
						</View>
					)}
				</View>
			) : null}
			<FlatList data={data!} renderItem={renderItem} keyExtractor={keyExtractor} />
		</View>
	);
};

const defaultProps: Partial<MultiLevelSelectorListProps> = {
	items: [],
	searchable: false,
	showCount: false,
};

const defaultStyles = (theme: Theme): MultiLevelSelectorListStyles => ({
	root: {},

	toolbar: {
		paddingHorizontal: theme.spacing.unit * 2,
		paddingTop: theme.spacing.unit,
	},

	searchWrapper: {
		paddingBottom: theme.spacing.unit,
	},
});

MultiLevelSelectorListComponent.defaultProps = defaultProps;
MultiLevelSelectorListComponent.defaultStyles = defaultStyles;

export const MultiLevelSelectorList: React.ComponentType<MultiLevelSelectorListProps> = applyStyles(
	{ name: 'MultiLevelSelectorList' }
)(MultiLevelSelectorListComponent as any);
