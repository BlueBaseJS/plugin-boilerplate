import { CommiHeaderProps } from '../CommiHeader';
import React from 'react';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const data = [
	{
		href: '/',
		title: 'Women',

		items: [
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
		],
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
		title: 'Kids',

		items: [],
	},
];

const CommiHeader = getComponent<CommiHeaderProps>('CommiHeader');

storiesOf('CommiHeader/Main/CommiHeader', module)
	.add('Basic Example', () => (
		<CommiHeader
			headerLogoProps={{ source: { uri: require('./orient-logo.png') } }}
			menuItems={data}
		/>
	))
	.add('Loading State', () => (
		<CommiHeader
			headerLogoProps={{ source: { uri: require('./orient-logo.png') } }}
			menuItems={[...data, ...data]}
			loading
		/>
	))
	.add('2 Rows', () => (
		<CommiHeader
			headerLogoProps={{ source: { uri: require('./orient-logo.png') } }}
			menuItems={[...data, ...data]}
		/>
	))
	.add('Loggedin User', () => (
		<CommiHeader
			headerLogoProps={{ source: { uri: require('./orient-logo.png') } }}
			menuItems={[...data, ...data]}
			userMenuProps={{
				avatar: 'https://placeimg.com/100/100/people',
				email: 'rehman@blueeast.com',
				loggedIn: true,
				name: 'Abdul Rehman',
			}}
			cartButtonProps={{
				count: 4,
			}}
		/>
	));
