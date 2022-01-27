import { ComponentState, ComponentStateProps } from '@bluebase/components';

import React from 'react';
import { useIntl } from '@bluebase/core';

export interface PaymentMethodListEmptyStateProps extends ComponentStateProps {}

export const PaymentMethodListEmptyState = (props: PaymentMethodListEmptyStateProps) => {
	const { __ } = useIntl();
	return (
		<ComponentState
			title={__('No Payment Methods')}
			description={__('No Payment Methods found!')}
			imageSource="PaymentMethodListEmptyImage"
			{...props}
		/>
	);
};

PaymentMethodListEmptyState.displayName = 'PaymentMethodListEmptyState';
