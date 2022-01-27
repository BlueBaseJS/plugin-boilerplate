import { BlueBaseImage, Overline, View } from '@bluebase/components';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Placeholder, PlaceholderMedia, PlaceholderOverline } from '../../imports';
import { Theme, useStyles } from '@bluebase/core';

import { ExternalLink } from '../ExternalLink';
import React from 'react';

export interface FooterPartnerBrandsStyles {
	root: ViewStyle;
	title: ViewStyle;
	titleText: TextStyle;
	links: ViewStyle;
	link: ViewStyle;
	linkText: TextStyle;
	image: ImageStyle;
}

export interface FooterPartnerBrandsItemType {
	name?: string;
	href: string;
	uri: string;
}

export interface FooterPartnerBrandsProps {
	title: string;
	items: FooterPartnerBrandsItemType[];
	loading: boolean;
	style?: ViewStyle;
	styles?: Partial<FooterPartnerBrandsStyles>;
}

const defaultStyles = (theme: Theme): FooterPartnerBrandsStyles => ({
	root: {
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},

	title: {
		marginRight: theme.spacing.unit * 2,
		paddingVertical: theme.spacing.unit,
	},

	titleText: {
		color: theme.palette.text.secondary,
		fontWeight: 'bold',
	},

	links: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},

	link: {
		marginRight: theme.spacing.unit * 2,
		marginVertical: theme.spacing.unit,
	},

	linkText: {
		color: theme.palette.text.secondary,
		height: 20,
	},

	image: {
		height: 20,
		width: 100,
	},
});

export const FooterPartnerBrands = (props: FooterPartnerBrandsProps) => {
	const { title, items, loading, style } = props;
	const styles = useStyles('FooterPartnerBrands', props, defaultStyles);

	if (loading) {
		return (
			<Placeholder>
				<View style={[styles.root, style]}>
					<View style={[styles.title, { width: '10%' }]}>
						<PlaceholderOverline width={100}>{title}</PlaceholderOverline>
					</View>
					{[{}, {}, {}].map((_link, i) => (
						<View style={styles.link} key={i}>
							<PlaceholderMedia style={styles.image} />
						</View>
					))}
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
				<Overline style={styles.titleText}>{title}</Overline>
			</View>
			{items.map((link, i) => (
				<View style={styles.link} key={i}>
					<ExternalLink style={styles.linkText} href={link.href} target="_blank">
						<BlueBaseImage source={{ uri: link.uri }} style={styles.image} resizeMode="contain" />
					</ExternalLink>
				</View>
			))}
		</View>
	);
};

FooterPartnerBrands.defaultProps = {
	items: [],
	loading: false,
	title: 'Shop Our Brands',
};

FooterPartnerBrands.displayName = 'FooterPartnerBrands';
