import { FeatureList, FeatureListProps } from './FeatureList';
import { FeatureListCollapsible, FeatureListCollapsibleProps } from './FeatureListCollapsible';

import React from 'react';

export interface FeaturesProps
	extends Partial<FeatureListCollapsibleProps>,
		Partial<FeatureListProps> {
	type: 'default' | 'collapsible';
}

export const Features = (props: FeaturesProps) => {
	const { type, ...rest } = props;

	if (type === 'collapsible') {
		return <FeatureListCollapsible {...rest} />;
	}

	return <FeatureList {...rest} />;
};

Features.defaultProps = {
	type: 'default',
};

Features.displayName = 'Features';
