import { Card, View } from '@bluebase/components';
import { Fade, Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import React from 'react';
import { Theme } from '@bluebase/core';

export interface SkeletonCardStyles {
	root: ViewStyle;
	content: TextStyle;
	title: TextStyle;
	titleHeight: number;
	descriptionHeight: number;
}

export interface SkeletonCardProps {
	/** Width of the card */
	width: number;
	style?: StyleProp<ViewStyle>;
	styles?: Partial<SkeletonCardStyles>;
}

/**
 * SkeletonCard used for listing Places. A place represents a physical location in the Mevris Platform.
 */

export const SkeletonCard = (props: SkeletonCardProps) => {
	const { styles: _styles, width } = props;
	const styles = _styles as SkeletonCardStyles;

	return (
		<Card style={{ ...styles.root, width }}>
			<Placeholder Animation={Fade}>
				<PlaceholderMedia size={width} style={{ borderRadius: 0 }} isRound={false} />
				<View style={styles.content}>
					<PlaceholderLine width={70} height={styles.titleHeight} style={styles.title} noMargin />
					<PlaceholderLine width={30} height={styles.descriptionHeight} noMargin />
				</View>
			</Placeholder>
		</Card>
	);
};

/**
 *  default props of SkeletonCard
 * if no props are given then
 * SkeletonCard will render with
 * these props
 */

SkeletonCard.defaultProps = {
	width: 190,
};

SkeletonCard.defaultStyles = (theme: Theme): SkeletonCardStyles => ({
	root: {
		// height: 230,
	},

	content: {
		padding: theme.spacing.unit,
	},

	title: {
		marginBottom: theme.spacing.unit,
	},

	titleHeight: theme.typography.subtitle1.fontSize! + 2,

	descriptionHeight: theme.typography.caption.fontSize! + 2,
});
