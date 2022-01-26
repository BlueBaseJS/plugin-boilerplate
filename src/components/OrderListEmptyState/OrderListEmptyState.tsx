import { ComponentState, ComponentStateProps } from '@bluebase/components';

import React from 'react';
import { useIntl } from '@bluebase/core';

export interface OrderListEmptyStateProps extends ComponentStateProps {}

export const OrderListEmptyState = (props: OrderListEmptyStateProps) => {
	const { __ } = useIntl();
	return (
		<ComponentState
			title={__('No Orders')}
			description={__('No orders found!')}
			imageSource="OrderListEmptyImage"
			{...props}
		/>
	);
};

OrderListEmptyState.displayName = 'OrderListEmptyState';
