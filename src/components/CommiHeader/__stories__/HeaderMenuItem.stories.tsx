import { HeaderMenuItem } from '../HeaderMenuItem';
import React from 'react';
import { View } from '@bluebase/components';
import storiesOf from '@bluebase/storybook-addon';

const data = {
	href: '/',
	title: 'Outwear',

	items: [
		{
			href: '/',
			items: [],
			title: 'Tops & T-Shirts',
		},
		{
			href: '/',
			items: [],
			title: 'Kurtas',
		},
		{
			href: '/',
			items: [],
			title: 'Shalwar Kameez',
		},
		{
			href: '/',
			items: [],
			title: 'Pret Wear',
		},
		{
			href: '/',
			items: [],
			title: 'Bridal',
		},
	],
};

storiesOf('CommiHeader/Parts/HeaderMenuItem', module)
	.add('Normal State', () => (
		<View style={{ alignItems: 'flex-start', flexDirection: 'row' }}>
			<HeaderMenuItem {...data} />
			<HeaderMenuItem {...data} />
			<HeaderMenuItem title="Fabric Type" href="" />
		</View>
	))
	.add('Loading State', () => (
		<View style={{ alignItems: 'flex-start', flexDirection: 'row' }}>
			<HeaderMenuItem loading />
		</View>
	));
