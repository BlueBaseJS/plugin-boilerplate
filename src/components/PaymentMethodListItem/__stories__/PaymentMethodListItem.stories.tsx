import { PaymentMethodListItemProps } from '../PaymentMethodListItem';
import React from 'react';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const PaymentMethodListItem = getComponent<PaymentMethodListItemProps>('PaymentMethodListItem');

storiesOf('PaymentMethodListItem', module)
	.add('Basic Example', () => (
		<PaymentMethodListItem
			title="Cash on Delivery"
			description="Pay right at your door step!"
			avatar="https://placeimg.com/50/50/any"
		/>
	))
	.add('With Skeleton', () => (
		<>
			<PaymentMethodListItem
				title="Cash on Delivery"
				description="Pay right at your door step!"
				avatar="https://placeimg.com/50/50/any"
			/>
			<PaymentMethodListItem loading title="Cash on Delivery" />
		</>
	));
