import { MiniList } from '../MiniList';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('MiniList/MiniList', module)
	.add('Normal State', () => (
		<MiniList
			items={[
				{
					icon: 'decagram',
					title: 'Brand Warranty',
				},
				{
					action: 'Learn More',
					icon: 'truck-fast',
					title: 'Same Day Delivery',
				},
				{
					icon: 'cash',
					title: 'Cash on Delivery',
				},
				{
					icon: 'swap-horizontal',
					title: 'Easy Returns & Exchanges',
				},
			]}
		/>
	))
	.add('Default Icons', () => (
		<MiniList
			items={[
				{
					title: 'Beautiful Mirror Panel',
				},
				{
					title: 'Inverter Technology',
				},
				{
					title: 'Gold Fin Evaporater & Condenser',
				},
			]}
		/>
	))
	.add('Loading State', () => <MiniList loading />);
