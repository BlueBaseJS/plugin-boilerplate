import { BlueBaseImage, BlueBaseImageProps, Subtitle1, View } from '@bluebase/components';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Placeholder, PlaceholderMedia, PlaceholderSubtitle1 } from '../../imports';
import { Theme, useStyles } from '@bluebase/core';

import { ExternalLink } from '../ExternalLink';
import React from 'react';

export interface FooterAppDownloadLinksStyles {
	root: ViewStyle;
	title: ViewStyle;
	titleText: TextStyle;
	links: ViewStyle;
	link: ViewStyle;
	linkText: TextStyle;
	image: ImageStyle;
}

export interface FooterAppDownloadLinksItemType {
	name: string;
	href: string;
}

export interface FooterAppDownloadLinksProps {
	title: string;
	appleAppStore?: string;
	appleAppStoreLogo?: BlueBaseImageProps['source'];
	googleAppStoreLogo?: BlueBaseImageProps['source'];
	googlePlayStore?: string;
	loading: boolean;
	style?: ViewStyle;
	styles?: Partial<FooterAppDownloadLinksStyles>;
}

const defaultStyles = (theme: Theme): FooterAppDownloadLinksStyles => ({
	root: {},

	title: {
		marginBottom: theme.spacing.unit,
	},

	titleText: {
		fontWeight: 'bold',
	},

	links: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},

	link: {
		marginBottom: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2,
	},

	linkText: {
		color: theme.palette.text.secondary,
	},

	image: {
		height: 40,
		width: 120,
	},
});

export const FooterAppDownloadLinks = (props: FooterAppDownloadLinksProps) => {
	const {
		title,
		appleAppStore,
		googlePlayStore,
		appleAppStoreLogo,
		googleAppStoreLogo,
		loading,
		style,
	} = props;
	const styles = useStyles('FooterAppDownloadLinks', props, defaultStyles);

	if (loading) {
		return (
			<Placeholder>
				<View style={[styles.root, style]}>
					<View style={[styles.title, { width: '55%' }]}>
						<PlaceholderSubtitle1 width={100} />
					</View>
					<View style={styles.links}>
						{[{}, {}].map((_link, i) => (
							<View style={styles.link} key={i}>
								<PlaceholderMedia style={[styles.image, { height: 40, width: 120 }]} />
							</View>
						))}
					</View>
				</View>
			</Placeholder>
		);
	}

	if (!appleAppStore && !googlePlayStore) {
		return null;
	}

	return (
		<View style={[styles.root, style]}>
			<View style={styles.title}>
				<Subtitle1 style={styles.titleText}>{title}</Subtitle1>
			</View>
			<View style={styles.links}>
				{appleAppStore && (
					<ExternalLink style={styles.linkText} href={appleAppStore} target="_blank">
						<BlueBaseImage
							testID="AppleAppStoreBadge"
							source={appleAppStoreLogo}
							style={[styles.image, { height: 40, width: 120 }]}
						/>
					</ExternalLink>
				)}

				{googlePlayStore && (
					<ExternalLink style={styles.linkText} href={googlePlayStore} target="_blank">
						<BlueBaseImage
							testID="GooglePlayStoreBadge"
							source={googleAppStoreLogo}
							style={[styles.image, { height: 40, width: 136 }]}
						/>
					</ExternalLink>
				)}
			</View>
		</View>
	);
};

FooterAppDownloadLinks.defaultProps = {
	appleAppStoreLogo: 'AppleAppStoreBadge',
	googleAppStoreLogo: 'GooglePlayStoreBadge',
	loading: false,
	title: 'Downloads',
};

FooterAppDownloadLinks.displayName = 'FooterAppDownloadLinks';
