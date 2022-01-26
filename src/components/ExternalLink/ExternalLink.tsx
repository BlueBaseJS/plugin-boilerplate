import React, { useState } from 'react';
import { Text, TextProps } from '@bluebase/components';

import { TextStyle } from 'react-native';

export interface ExternalLinkProps extends TextProps {
	[key: string]: any;
	Component?: React.ComponentType<TextProps>;
	hoverStyle?: TextStyle;
}

export const ExternalLink = (props: ExternalLinkProps) => {
	const { Component, style, hoverStyle, ...rest } = props;
	const [isHovering, setHovering] = useState(false);

	return React.createElement(Component as any, {
		accessibilityRole: 'link',
		style: [{ flex: 1, flexWrap: 'wrap' }, style, isHovering && hoverStyle],
		testID: 'external-link-internal',
		// onPress:() => {
		// 	Linking.openURL(appleAppStore);
		// },

		onMouseEnter: () => setHovering(true),
		onMouseLeave: () => setHovering(false),
		...rest,
	});
};

ExternalLink.defaultProps = {
	Component: Text,
};

ExternalLink.displayName = 'ExternalLink';
