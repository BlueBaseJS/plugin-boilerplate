import { Placeholder, PlaceholderMedia, PlaceholderSubtitle1 } from '../../imports';
import { Subtitle1, View } from '@bluebase/components';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, getComponent, useStyles } from '@bluebase/core';

import { ExternalLink } from '../ExternalLink';
import React from 'react';

const Icon = getComponent('Icon');

export interface FooterSocialLinksStyles {
	root: ViewStyle;
	title: ViewStyle;
	titleText: TextStyle;
	links: ViewStyle;
	link: ViewStyle;
	linkText: TextStyle;
}

export interface FooterSocialLinksItemType {
	name: string;
	href: string;
}

export interface FooterSocialLinksProps {
	title: string;
	items: FooterSocialLinksItemType[];
	loading: boolean;
	style?: ViewStyle;
	styles?: Partial<FooterSocialLinksStyles>;
}

const defaultStyles = (theme: Theme): FooterSocialLinksStyles => ({
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
		marginRight: theme.spacing.unit * 2,
	},

	linkText: {
		color: theme.palette.text.secondary,
	},
});

export const FooterSocialLinks = (props: FooterSocialLinksProps) => {
	const { title, items, loading, style } = props;
	const styles = useStyles('FooterSocialLinks', props, defaultStyles);

	if (loading) {
		return (
			<Placeholder>
				<View style={[styles.root, style]}>
					<View style={[styles.title, { width: '55%' }]}>
						<PlaceholderSubtitle1 width={100}>{title}</PlaceholderSubtitle1>
					</View>
					<View style={styles.links}>
						{[{}, {}, {}, {}].map((_link, i) => (
							<View style={styles.link} key={i}>
								<PlaceholderMedia style={{ height: 24, width: 24 }} />
							</View>
						))}
					</View>
				</View>
			</Placeholder>
		);
	}

	if (items.length === 0) {
		return null;
	}

	return (
		<View style={[styles.root, style]}>
			<View style={styles.title}>
				<Subtitle1 style={styles.titleText}>{title}</Subtitle1>
			</View>
			<View style={styles.links}>
				{items.map((link, i) => (
					<View key={i} style={styles.link}>
						<ExternalLink
							Component={Icon}
							style={styles.linkText}
							href={link.href}
							target="_blank"
							name={link.name}
							size={24}
						/>
					</View>
				))}
			</View>
		</View>
	);
};

FooterSocialLinks.defaultProps = {
	items: [],
	loading: false,
	title: 'Follow Us',
};

FooterSocialLinks.displayName = 'FooterSocialLinks';
