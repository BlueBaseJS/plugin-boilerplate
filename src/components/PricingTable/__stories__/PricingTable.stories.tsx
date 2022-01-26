import { PricingTable } from '../';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('PricingTable ', module)
	.add('with subTotal and total price', () => <PricingTable subTotal={3000} total={3000} />)
	.add('with 50% discount', () => <PricingTable subTotal={120} discount={50} />)
	.add('with subTotal price and discount', () => <PricingTable subTotal={100} discount={25} />)
	.add('with subTotal, tax', () => <PricingTable subTotal={200} tax={20} />)
	.add('with subTotal and tax = 1', () => <PricingTable subTotal={600} tax={1} />)
	.add('with subTotal and tax and  to be false', () => <PricingTable subTotal={200} tax={20} />)
	.add('with full props', () => <PricingTable subTotal={1000} tax={10} discount={5} shipping={70} />)
	.add('with full props on loading', () => (
		<PricingTable subTotal={1000} tax={10} discount={5} shipping={70} loading />
	));
