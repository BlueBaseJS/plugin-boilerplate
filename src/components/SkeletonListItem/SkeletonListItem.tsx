import { Fade, Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder';
import { Theme, ThemeConsumer, ThemeContextData } from '@bluebase/core';
import { View, ViewStyle } from 'react-native';

import React from 'react';

export interface SkeletonListItemStyles {
	root: ViewStyle;
	content: ViewStyle;

	media: ViewStyle;
	mediaIcon: ViewStyle;

	itemBox: ViewStyle;

	title: ViewStyle;
	description: ViewStyle;

	titleLineHeight: number;
	descriptionLineHeight: number;
}

export interface SkeletonListItemProps {
	description?: boolean;

	/**
	 * Variants to change avatar's shape
	 */

	variant?: 'circle' | 'rounded' | 'icon' | 'square';

	avatar?: boolean;

	style?: ViewStyle;

	styles?: Partial<SkeletonListItemStyles>;
}

/**
 * SkeletonListItem used for listing Places. A placeList represents a physical location in the Mevris Platform.
 */

export const SkeletonListItem = (props: SkeletonListItemProps) => {
	const { avatar, description, variant } = props;
	const styles = props.styles! as SkeletonListItemStyles;

	return (
		<ThemeConsumer>
			{(value: ThemeContextData) => {
				/** BorderRadius w.r.t shape */

				const getBorderRadius = () => {
					if (variant === 'circle') {
						return 50;
					}
					if (variant === 'icon') {
						return value.theme.shape.borderRadius;
					}
					if (variant === 'rounded') {
						return value.theme.shape.borderRadius;
					} else {
						return undefined;
					}
				};

				return (
					<Placeholder Animation={Fade}>
						<View testID="skeleton-root" style={{ ...styles.root }}>
							{avatar ? (
								<PlaceholderMedia
									isRound={variant === 'circle'}
									style={{
										...styles.media,
										...(variant === 'icon' && styles.mediaIcon),
										borderRadius: getBorderRadius(),
									}}
									testID="skeleton-avatar"
								/>
							) : null}
							<View style={{ ...styles.itemBox }}>
								<View style={styles.title}>
									<PlaceholderLine
										width={16}
										height={styles.titleLineHeight}
										noMargin
										testID="skeleton-title"
									/>
								</View>
								{description ? (
									<View style={styles.description}>
										<PlaceholderLine
											width={32}
											height={styles.descriptionLineHeight}
											noMargin
											testID="skeleton-description"
										/>
									</View>
								) : null}
							</View>
						</View>
					</Placeholder>
				);
			}}
		</ThemeConsumer>
	);
};

/**
 * default props of SkeletonListItem
 * if no props are given then
 * SkeletonListItem will render with
 * these props
 */
SkeletonListItem.defaultProps = {
	avatar: false,
	description: false,
	variant: 'circle',
};

SkeletonListItem.defaultStyles = (theme: Theme): SkeletonListItemStyles => ({
	content: {
		paddingHorizontal: theme.spacing.unit * 2,
	},
	media: {
		alignSelf: 'center',
		height: theme.spacing.unit * 5,
		marginLeft: theme.spacing.unit * 2,
		width: theme.spacing.unit * 5,
	},
	mediaIcon: {
		height: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 2,
		width: theme.spacing.unit * 3,
	},
	root: {
		alignItems: 'center',
		flexDirection: 'row',
		// paddingHorizontal: theme.spacing.unit * 2,
		paddingVertical: theme.spacing.unit * 1.25,
	},

	itemBox: {
		flex: 1,
		paddingLeft: theme.spacing.unit * 2,
	},

	title: { marginVertical: theme.spacing.unit / 2 },

	description: { marginVertical: theme.spacing.unit / 2 },

	descriptionLineHeight: theme.typography.body2.fontSize as number,
	titleLineHeight: theme.typography.body1.fontSize as number,
});
