import { HeaderMenuSubList } from '../HeaderMenuSubList';
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

storiesOf('CommiHeader/Parts/HeaderMenuSubList', module).add('Normal State', () => (
	<View style={{ alignItems: 'flex-start' }}>
		<HeaderMenuSubList {...data} />
		<HeaderMenuSubList {...data} />
		<HeaderMenuSubList title="Fabric Type" href="" />
	</View>
));
