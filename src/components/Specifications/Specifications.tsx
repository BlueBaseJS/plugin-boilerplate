import { Divider, H2, View } from '@bluebase/components';
import { SpecificationGroup, SpecificationGroupType } from './SpecificationGroup';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, useStyles } from '@bluebase/core';

import React from 'react';

export interface SpecificationsStyles {
	root: ViewStyle;
	title: ViewStyle;
	titleText: TextStyle;
}

export interface SpecificationsProps {
	items: SpecificationGroupType[];
	title: string;
	loading?: boolean;
	style?: ViewStyle;
	styles?: Partial<SpecificationsStyles>;
}

const defaultStyles = (theme: Theme): SpecificationsStyles => ({
	root: {
		borderColor: theme.palette.divider,
		borderWidth: 1,
	},

	title: {
		borderBottomColor: theme.palette.divider,
		borderBottomWidth: 1,
		paddingHorizontal: theme.spacing.unit * 3,
		paddingVertical: theme.spacing.unit * 2,
	},

	titleText: {
		...theme.typography.h5,
		fontWeight: 'bold',
	},
});

export const Specifications = (props: SpecificationsProps) => {
	const { title, loading, style } = props;
	const items = loading ? ([{}, {}] as SpecificationGroupType[]) : props.items;
	const styles = useStyles('Specifications', props, defaultStyles);

	return (
		<View style={[styles.root, style]} testID="specifications-root">
			{title && (
				<View style={styles.title} testID="specification-container">
					<H2 style={styles.titleText} testID="specification-title">
						{title}
					</H2>
				</View>
			)}
			{items.map((item, i) => (
				<React.Fragment key={i}>
					<SpecificationGroup {...item} loading={loading} />
					{i < items.length - 1 ? <Divider /> : null}
				</React.Fragment>
			))}
		</View>
	);
};

Specifications.defaultProps = {
	items: [],
	loading: false,
	title: 'Specifications',
};

Specifications.displayName = 'Specifications';
