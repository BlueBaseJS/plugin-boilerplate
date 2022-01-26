import { Theme, isMobile, useStyles } from '@bluebase/core';

import { HeaderMenuSubList } from './HeaderMenuSubList';
import { MenuItemType } from './HeaderMenu';
import React from 'react';
import { View } from '@bluebase/components';
import { ViewStyle } from 'react-native';
import { or } from '../../helpers';

export interface MegaMenuStyles {
	root: ViewStyle;
	column: ViewStyle;
	columnAlt: ViewStyle;
}

const defaultStyles = (theme: Theme): MegaMenuStyles => ({
	root: {
		flexDirection: 'row',
	},

	column: {
		// backgroundColor: theme.palette.background.card,
		paddingHorizontal: theme.spacing.unit * 2,
		paddingVertical: theme.spacing.unit,
		width: or(isMobile(), undefined, 140),
	},

	columnAlt: {
		backgroundColor: theme.palette.background.light,
	},
});

export interface MegaMenuProps {
	items: MenuItemType[];
	styles?: Partial<MegaMenuStyles>;
	style?: ViewStyle;
}

export const MegaMenu = (props: MegaMenuProps) => {
	const { items, style } = props;
	const styles = useStyles('MegaMenu', props, defaultStyles);

	const columnCount = items.length <= 5 ? items.length : 5;

	const renderColumn = (index: number) => {
		const columnItems = [];

		for (let i = index; i < items.length; i = i + columnCount) {
			columnItems.push(items[i]);
		}

		return (
			<View
				style={[styles.column, index % 2 !== 0 && styles.columnAlt]}
				key={index}
				testID="mega-menu-column"
			>
				{columnItems.map((item, i) => (
					<HeaderMenuSubList key={i} {...item} />
				))}
			</View>
		);
	};

	const columns = [];

	for (let index = 0; index < columnCount; index++) {
		columns.push(renderColumn(index));
	}

	return (
		<View testID="mega-menu-root" style={[styles.root, style]}>
			{columns}
		</View>
	);
};

MegaMenu.defaultProps = {
	items: [],
};

MegaMenu.displayName = 'MegaMenu';
