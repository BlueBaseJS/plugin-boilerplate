import { FeatureItem, FeatureItemProps } from './FeatureItem';

import { Collapsible } from '../../imports';
import { Divider } from '@bluebase/components';
import React from 'react';

export interface FeatureItemCollapsibleProps extends FeatureItemProps {
	title: string;
	open?: boolean;
}

export const FeatureItemCollapsible = (props: FeatureItemCollapsibleProps) => {
	const { title, open, loading, ...rest } = props;

	return (
		<Collapsible title={title} loading={loading} open={open}>
			<Divider />
			<FeatureItem loading={loading} {...rest} />
		</Collapsible>
	);
};

FeatureItemCollapsible.defaultProps = {
	loading: false,
	title: '',
};

FeatureItemCollapsible.displayName = 'FeatureItemCollapsible';
