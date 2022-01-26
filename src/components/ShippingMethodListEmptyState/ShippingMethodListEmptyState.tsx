import { ComponentState, ComponentStateProps } from '@bluebase/components';

import React from 'react';
import { useIntl } from '@bluebase/core';

export interface ShippingMethodListEmptyStateProps extends ComponentStateProps {}

export const ShippingMethodListEmptyState = (props: ShippingMethodListEmptyStateProps) => {
	const { __ } = useIntl();
	return (
		<ComponentState
			title={__('No Shipping Methods')}
			description={__('No Shipping Methods found!')}
			imageSource="ShippingMethodListEmptyImage"
			{...props}
		/>
	);
};

ShippingMethodListEmptyState.displayName = 'ShippingMethodListEmptyState';
