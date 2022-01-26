import { Column, Container, Row, View } from '@bluebase/components';
import {
	FooterAppDownloadLinks,
	FooterAppDownloadLinksProps,
	FooterAppDownloadLinksStyles,
} from './FooterAppDownloadLinks';
import { FooterCopyright, FooterCopyrightStyles } from './FooterCopyright';
import { FooterLinkList, FooterLinkListStyles, FooterLinkListType } from './FooterLinkList';
import {
	FooterOverviewSection,
	FooterOverviewSectionProps,
	FooterOverviewSectionStyles,
} from './FooterOverviewSection';
import {
	FooterPartnerBrands,
	FooterPartnerBrandsItemType,
	FooterPartnerBrandsStyles,
} from './FooterPartnerBrands';
import {
	FooterSocialLinks,
	FooterSocialLinksItemType,
	FooterSocialLinksStyles,
} from './FooterSocialLinks';
import { Theme, useStyles } from '@bluebase/core';

import React from 'react';
import { ViewStyle } from 'react-native';

export interface CommiFooterStyles {
	root: ViewStyle;
	content: ViewStyle;

	overview?: Partial<FooterOverviewSectionStyles>;
	list?: Partial<FooterLinkListStyles>;
	apps?: Partial<FooterAppDownloadLinksStyles>;
	social?: Partial<FooterSocialLinksStyles>;
	partnerBrands?: Partial<FooterPartnerBrandsStyles>;
	copyright?: Partial<FooterCopyrightStyles>;
}

export interface CommiFooterProps {
	// Overview
	logoSource?: FooterOverviewSectionProps['logoSource'];
	tagline?: FooterOverviewSectionProps['tagline'];

	// Copyright
	brandName?: string;

	// List
	lists: FooterLinkListType[];

	// Apps
	apps?: {
		title?: string;
		appleAppStore?: string;
		appleAppStoreLogo?: FooterAppDownloadLinksProps['appleAppStoreLogo'];
		googlePlayStore?: string;
		googleAppStoreLogo?: FooterAppDownloadLinksProps['googleAppStoreLogo'];
	};

	// Social Links
	social?: {
		title?: string;
		items?: FooterSocialLinksItemType[];
	};

	// Partner Brands
	partnerBrands?: {
		title?: string;
		items?: FooterPartnerBrandsItemType[];
	};

	loading?: boolean;
	style?: ViewStyle;
	styles?: Partial<CommiFooterStyles>;
}

const defaultStyles = (theme: Theme): CommiFooterStyles => ({
	root: {
		alignItems: 'center',
		backgroundColor: theme.palette.background.dark,
		borderTopColor: theme.palette.divider,
		borderTopWidth: 1,
		paddingHorizontal: theme.spacing.unit * 2,
	},

	content: {
		marginVertical: theme.spacing.unit * 2,
	},

	overview: {
		root: {
			marginBottom: theme.spacing.unit * 2,
			marginRight: theme.spacing.unit * 2,
		},
	},

	apps: {
		root: {
			marginBottom: theme.spacing.unit * 2,
		},
	},

	partnerBrands: {
		root: {
			borderTopColor: theme.palette.divider,
			borderTopWidth: 1,
			paddingVertical: theme.spacing.unit / 2,
		},
	},

	copyright: {
		root: {
			borderTopColor: theme.palette.divider,
			borderTopWidth: 1,
			paddingVertical: theme.spacing.unit,
		},
	},
});

export const CommiFooter = (props: CommiFooterProps) => {
	const { brandName, tagline, logoSource, apps, social, partnerBrands, loading, style } = props;
	const styles = useStyles('CommiFooter', props, defaultStyles);
	const lists = loading ? ([{}, {}, {}] as FooterLinkListType[]) : props.lists;

	return (
		<View style={[styles.root, style]}>
			<Container>
				<Row style={styles.content}>
					<Column xs={12} sm={12} md={4} lg={3} xl={3}>
						<FooterOverviewSection
							tagline={tagline}
							logoSource={logoSource}
							styles={styles.overview}
							loading={loading}
						/>
					</Column>
					<Column xs={12} sm={12} md={8} lg={9} xl={9}>
						<Row>
							{lists.map((list, i) => (
								<Column key={i} xs={6} sm={6} md={4} lg={3} xl={3}>
									<FooterLinkList {...list} loading={loading} styles={styles.list} />
								</Column>
							))}

							<Column xs={6} sm={6} md={4} lg={3} xl={3}>
								<FooterAppDownloadLinks {...apps} loading={loading} styles={styles.apps} />
								<FooterSocialLinks {...social} loading={loading} styles={styles.social} />
							</Column>
						</Row>
					</Column>
				</Row>
				<FooterPartnerBrands {...partnerBrands} styles={styles.partnerBrands} loading={loading} />
				<FooterCopyright brandName={brandName} styles={styles.copyright} loading={loading} />
			</Container>
		</View>
	);
};

CommiFooter.defaultProps = {
	lists: [],
	loading: false,
	logoSource: 'Logo',
};

CommiFooter.displayName = 'CommiFooter';
