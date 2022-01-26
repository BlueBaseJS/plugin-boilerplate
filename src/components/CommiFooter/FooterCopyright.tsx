import { Caption, View } from '@bluebase/components';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, useStyles } from '@bluebase/core';

import { ExternalLink } from '../ExternalLink';
import { Placeholder } from '../../imports';
import { PlaceholderCaption } from '@bluebase/plugin-rn-placeholder';
import React from 'react';

export interface FooterCopyrightStyles {
	root: ViewStyle;
	text: TextStyle;
	linkText: TextStyle;
	linkHoverText: TextStyle;
}

export interface FooterCopyrightProps {
	brandName: string;
	loading: boolean;
	style?: ViewStyle;
	styles?: Partial<FooterCopyrightStyles>;
}

const defaultStyles = (theme: Theme): FooterCopyrightStyles => ({
	root: {},

	text: {
		color: theme.palette.text.secondary,
	},

	linkText: {
		color: theme.palette.text.secondary,
		fontWeight: 'bold',
	},

	linkHoverText: {
		textDecorationLine: 'underline',
	},
});

export const FooterCopyright = (props: FooterCopyrightProps) => {
	const { brandName, loading, style } = props;
	const styles = useStyles('FooterCopyright', props, defaultStyles);

	if (loading) {
		return (
			<Placeholder>
				<View style={[styles.root, style]}>
					<PlaceholderCaption width={25} />
				</View>
			</Placeholder>
		);
	}

	return (
		<View style={[styles.root, style]}>
			<Caption style={styles.text}>
				© {new Date().getFullYear()} {brandName}. Powered by{' '}
				<ExternalLink
					Component={Caption}
					style={styles.linkText}
					href="https://www.commi.com?ref=copyright"
					target="_blank"
					hoverStyle={styles.linkHoverText}
				>
					Commi
				</ExternalLink>
				. Developed at{' '}
				<ExternalLink
					Component={Caption}
					style={styles.linkText}
					href="https://www.blueeast.com?ref=copyright"
					target="_blank"
					hoverStyle={styles.linkHoverText}
				>
					BlueEast
				</ExternalLink>
				.
			</Caption>
		</View>
	);
};

FooterCopyright.defaultProps = {
	brandName: '',
	loading: false,
};

FooterCopyright.displayName = 'FooterCopyright';
