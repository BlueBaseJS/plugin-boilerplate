import { MegaMenu } from '../MegaMenu';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

const data = [
	{
		href: '/',
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
		],
		title: 'Outwear',
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
		title: 'Men',

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
		],
	},
	{
		href: '/',
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
		],
		title: 'Outwear',
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
		title: 'Men',

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
		],
	},
];

storiesOf('CommiHeader/Parts/MegaMenu', module).add('Basic Example', () => (
	<MegaMenu items={data} />
));
