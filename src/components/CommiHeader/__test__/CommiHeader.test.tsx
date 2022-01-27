import { BlueBaseApp } from '@bluebase/core';
import BlueBaseMaterialUI from '@bluebase/plugin-material-ui';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { CommiHeader } from '../CommiHeader';
import { HeaderMenu } from '../HeaderMenu';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBaseRnPlaceholder, BlueBaseMaterialUI, Plugin];

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

describe('CommiHeader', () => {
	it('should render a single row header', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<CommiHeader headerLogoProps={{ source: '' }} menuItems={data} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, CommiHeader);

		expect(wrapper.find(HeaderMenu).exists()).toBe(true);
		expect(wrapper.find('[testID="commi-header-menu-row"]').exists()).toBe(false);

		wrapper.unmount();
	});

	it('should render a 2 row header', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<CommiHeader headerLogoProps={{ source: '' }} menuItems={[...data, ...data]} />)
			</BlueBaseApp>
		);

		await waitForElement(wrapper, CommiHeader);

		expect(wrapper.find(HeaderMenu).exists()).toBe(true);
		expect(wrapper.find('[testID="commi-header-menu-row"]').exists()).toBe(true);

		wrapper.unmount();
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<CommiHeader headerLogoProps={{ source: '' }} menuItems={[...data, ...data]} loading />)
			</BlueBaseApp>
		);

		await waitForElement(wrapper, CommiHeader);

		expect(wrapper.find('Placeholder').length).toBeGreaterThan(0);

		wrapper.unmount();
	});
});
