import { H4, View } from '@bluebase/components';
import { Placeholder, PlaceholderSubtitle1 } from '../../imports';
import { SpecificationItem, SpecificationItemType } from './SpecificationItem';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, useStyles } from '@bluebase/core';

import React from 'react';

export interface SpecificationGroupStyles {
	root: ViewStyle;
	title: ViewStyle;
	titleText: TextStyle;
}

export interface SpecificationGroupType {
	title?: string;
	items: SpecificationItemType[];
}

export interface SpecificationGroupProps extends SpecificationGroupType {
	loading?: boolean;
	style?: ViewStyle;
	styles?: Partial<SpecificationGroupStyles>;
}

const defaultStyles = (theme: Theme): SpecificationGroupStyles => ({
	root: {
		flexDirection: 'column',
		padding: theme.spacing.unit * 3,
	},

	title: {
		paddingBottom: theme.spacing.unit * 2,
	},

	titleText: {
		...theme.typography.subtitle1,
		fontWeight: 'bold',
	},
});

export const SpecificationGroup = (props: SpecificationGroupProps) => {
	const { title, items, loading, style } = props;
	const styles = useStyles('SpecificationGroup', props, defaultStyles);

	if (loading) {
		return (
			<Placeholder>
				<View style={[styles.root, style]} testID="specification-group-root">
					<View style={styles.title} testID="specification-group-container">
						<PlaceholderSubtitle1 width={15} />
					</View>
					{[0, 1, 2].map(i => (
						<SpecificationItem key={i} loading />
					))}
				</View>
			</Placeholder>
		);
	}

	return (
		<View style={[styles.root, style]} testID="specification-group-root">
			<View style={styles.title} testID="specification-group-container">
				<H4 style={styles.titleText} testID="specification-group-title">
					{title}
				</H4>
			</View>
			{items.map((item, i) => (
				<SpecificationItem key={i} {...item} />
			))}
		</View>
	);
};

SpecificationGroup.defaultProps = {
	items: [],
	loading: false,
};

SpecificationGroup.displayName = 'SpecificationGroup';
