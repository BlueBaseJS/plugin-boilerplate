import { BlueBaseImage, BlueBaseImageProps, Body2, View } from '@bluebase/components';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Placeholder, PlaceholderBody2, PlaceholderMedia } from '../../imports';
import { Theme, useStyles } from '@bluebase/core';

import React from 'react';

export interface FooterOverviewSectionStyles {
	root: ViewStyle;
	logoImage: ImageStyle;
	taglineText: TextStyle;
}

export interface FooterOverviewSectionProps {
	logoSource: BlueBaseImageProps['source'];
	tagline?: string;
	loading: boolean;
	style?: ViewStyle;
	styles?: Partial<FooterOverviewSectionStyles>;
}

const defaultStyles = (theme: Theme): FooterOverviewSectionStyles => ({
	root: {},

	logoImage: {
		height: 100,
		width: 100,
	},

	taglineText: {
		color: theme.palette.text.secondary,
		marginTop: theme.spacing.unit * 2,
	},
});

export const FooterOverviewSection = (props: FooterOverviewSectionProps) => {
	const { logoSource, tagline, loading, style } = props;
	const styles = useStyles('FooterOverviewSection', props, defaultStyles);

	if (loading) {
		return (
			<Placeholder>
				<View style={[styles.root, style]}>
					<PlaceholderMedia style={styles.logoImage} />
					<PlaceholderBody2 width={90} style={styles.taglineText} />
					<PlaceholderBody2 width={100} />
					<PlaceholderBody2 width={40} />
				</View>
			</Placeholder>
		);
	}

	return (
		<View style={[styles.root, style]}>
			<BlueBaseImage source={logoSource} style={styles.logoImage} />
			<Body2 style={styles.taglineText}>{tagline}</Body2>
		</View>
	);
};

FooterOverviewSection.defaultProps = {
	loading: false,
	logoSource: 'Logo',
};

FooterOverviewSection.displayName = 'FooterOverviewSection';
