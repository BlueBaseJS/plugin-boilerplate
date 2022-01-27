import React from 'react';
import { ShippingMethodListItem } from '../ShippingMethodListItem';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('ShippingMethodListItem', module).add('Basic Example', () => (
	<>
		<ShippingMethodListItem
			id="123"
			estimatedTimeOfDelivery="2-3 days"
			price={300}
			title="TCS"
			avatar="https://placeimg.com/50/50/any"
		/>
		<ShippingMethodListItem
			loading
			id="123"
			price={300}
			title="TCS"
			estimatedTimeOfDelivery="2-3 days"
		/>
	</>
));
