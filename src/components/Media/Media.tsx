import { Placeholder, PlaceholderMedia } from '../../imports';

import { ComponentState } from '@bluebase/components';
import React from 'react';
import { ViewStyle } from 'react-native';
import { getComponent } from '@bluebase/core';

const ProgressiveImage = getComponent('ProgressiveImage', 'BlueBaseImage');

export interface MediaType {
	type?: 'image' | 'video' | '360-video';
	uri?: string;
	thumbnail?: string;
	width?: number;
	height?: number;
}

export interface MediaProps extends MediaType {
	loading?: boolean;
	style?: ViewStyle;
}

export const Media = (props: MediaProps) => {
	const { type, uri, thumbnail, width, height, loading, style, ...rest } = props;

	if (loading) {
		return (
			<Placeholder>
				<PlaceholderMedia style={{ width, height, ...style }} />
			</Placeholder>
		);
	}

	if (type === 'image') {
		return (
			<ProgressiveImage
				source={{ uri }}
				thumbnail={{ uri: thumbnail }}
				resizeMode="cover"
				style={{ width, height, ...style }}
				{...rest}
			/>
		);
	}

	// Add support for other media types here
	return (
		<ComponentState title="Unknown Media Type" styles={{ root: { width, height, ...style } }} />
	);
};

Media.defaultProps = {
	loading: false,
	type: 'image',
};

Media.displayName = 'Media';
