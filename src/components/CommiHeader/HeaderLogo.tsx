import { BlueBaseImage, BlueBaseImageProps, View } from '@bluebase/components';
import { Placeholder, PlaceholderMedia } from '../../imports';
import { Theme, useStyles } from '@bluebase/core';

import ExternalLink from '../ExternalLink';
import React from 'react';
import { ViewStyle } from 'react-native';

export interface HeaderLogoStyles {
	root: ViewStyle;
}

const defaultStyles = (_theme: Theme): HeaderLogoStyles => ({
	root: {},
});

export interface HeaderLogoProps {
	source: BlueBaseImageProps['source'];
	width?: number;
	height?: number;

	loading?: boolean;
	styles?: Partial<HeaderLogoStyles>;
	style?: ViewStyle;
}

export const HeaderLogo = (props: HeaderLogoProps) => {
	const { source, width, height, loading, style } = props;
	const styles = useStyles('HeaderLogo', props, defaultStyles);

	if (loading) {
		return (
			<Placeholder>
				<View style={[styles.root, style]}>
					<PlaceholderMedia style={[{ width, height }]} />
				</View>
			</Placeholder>
		);
	}

	return (
		<View style={[{ width, height }, styles.root, style]} testID="user-avatar-root">
			<ExternalLink href="/">
				<BlueBaseImage source={source} style={{ width, height }} />
			</ExternalLink>
		</View>
	);
};

HeaderLogo.defaultProps = {
	height: 32,
	loading: false,
	width: 150,
};

HeaderLogo.displayName = 'HeaderLogo';
