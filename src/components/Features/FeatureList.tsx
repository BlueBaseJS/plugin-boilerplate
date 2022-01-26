import { FeatureItem, FeatureItemType } from './FeatureItem';
import { H2, View } from '@bluebase/components';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, isMobile, useStyles, useTheme } from '@bluebase/core';

import React from 'react';

export interface FeatureListStyles {
	root: ViewStyle;
	title: ViewStyle;
	titleText: TextStyle;
}

export interface FeatureListProps {
	title?: string;
	items: FeatureItemType[];
	variant: 'blank' | 'divider' | 'border';
	loading: boolean;
	style?: ViewStyle;
	styles?: Partial<FeatureListStyles>;
}

const defaultStyles = (theme: Theme): FeatureListStyles => ({
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

export const FeatureList = (props: FeatureListProps) => {
	const { variant, loading, title, style } = props;
	const items = loading ? [{}, {}, {}] : props.items;
	const { theme } = useTheme();
	const styles = useStyles('Specifications', props, defaultStyles);

	return (
		<View style={[styles.root, style]} testID="feature-list-root">
			{title && (
				<View style={styles.title} testID="feature-list-container">
					<H2 style={styles.titleText} testID="feature-list-title">
						{title}
					</H2>
				</View>
			)}

			{items!.map((item, i) => {
				let itemStyle: ViewStyle = {};

				if (!isMobile() && i % 2 !== 0) {
					itemStyle = { flexDirection: 'row-reverse' };
				}

				if (variant === 'divider' && i < items!.length - 1) {
					itemStyle.borderBottomColor = theme.palette.divider;
					itemStyle.borderBottomWidth = 1;
				}

				if (variant === 'border') {
					itemStyle.borderColor = theme.palette.divider;
					itemStyle.borderWidth = 1;
					itemStyle.borderRadius = theme.shape.borderRadius;

					if (i < items!.length - 1) {
						itemStyle.marginBottom = theme.spacing.unit * 2;
					}
				}

				return (
					<React.Fragment key={i}>
						<FeatureItem {...item} loading={loading} style={itemStyle} />
					</React.Fragment>
				);
			})}
		</View>
	);
};

FeatureList.defaultProps = {
	items: [],
	loading: false,
	title: 'Features',
	variant: 'divider',
};

FeatureList.displayName = 'FeatureList';
