import { Body2, Subtitle1, View } from '@bluebase/components';
import { Placeholder, PlaceholderBody2, PlaceholderSubtitle1 } from '../../imports';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, useStyles } from '@bluebase/core';

import { ExternalLink } from '../ExternalLink';
import React from 'react';

export interface FooterLinkListStyles {
	root: ViewStyle;
	title: ViewStyle;
	titleText: TextStyle;
	link: ViewStyle;
	linkText: TextStyle;
	linkHoverText: TextStyle;
}

export interface FooterLinkListItemType {
	title: string;
	href: string;
}

export interface FooterLinkListType {
	title?: string;
	items: FooterLinkListItemType[];
}

export interface FooterLinkListProps extends FooterLinkListType {
	loading: boolean;
	style?: ViewStyle;
	styles?: Partial<FooterLinkListStyles>;
}

const defaultStyles = (theme: Theme): FooterLinkListStyles => ({
	root: {
		marginBottom: theme.spacing.unit * 2,
	},

	title: {
		marginBottom: theme.spacing.unit,
	},

	titleText: {
		fontWeight: 'bold',
	},

	link: {
		marginVertical: theme.spacing.unit / 2,
	},

	linkText: {
		color: theme.palette.text.secondary,
	},

	linkHoverText: {
		textDecorationLine: 'underline',
	},
});

export const FooterLinkList = (props: FooterLinkListProps) => {
	const { title, items, loading, style } = props;
	const styles = useStyles('FooterLinkList', props, defaultStyles);

	if (loading) {
		return (
			<Placeholder>
				<View style={[styles.root, style]}>
					<View style={[styles.title, { width: '55%' }]}>
						<PlaceholderSubtitle1 width={100}>{title}</PlaceholderSubtitle1>
					</View>
					<View style={styles.link}>
						<PlaceholderBody2 width={45} />
					</View>
					<View style={styles.link}>
						<PlaceholderBody2 width={65} />
					</View>
					<View style={styles.link}>
						<PlaceholderBody2 width={55} />
					</View>
					<View style={styles.link}>
						<PlaceholderBody2 width={50} />
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
			{items.map((link, i) => (
				<View key={i} style={styles.link}>
					<ExternalLink
						Component={Body2}
						style={styles.linkText}
						hoverStyle={styles.linkHoverText}
						href={link.href}
					>
						{link.title}
					</ExternalLink>
				</View>
			))}
		</View>
	);
};

FooterLinkList.defaultProps = {
	items: [],
	loading: false,
};

FooterLinkList.displayName = 'FooterLinkList';
