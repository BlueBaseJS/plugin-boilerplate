import { BlueBaseApp } from '@bluebase/core';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { HeaderMenuSubList } from '../HeaderMenuSubList';
import { MegaMenu } from '../MegaMenu';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBaseRnPlaceholder, Plugin];

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

describe('MegaMenu', () => {
	it('should render list with 5 columns', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MegaMenu items={data} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MegaMenu);

		expect(wrapper.find('[testID="mega-menu-root"] > [testID="mega-menu-column"]')).toHaveLength(5);
		expect(wrapper.find(HeaderMenuSubList)).toHaveLength(8);

		wrapper.unmount();
	});

	it('should render list with 3 columns', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MegaMenu items={[data[0], data[1], data[2]]} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MegaMenu);

		expect(wrapper.find('[testID="mega-menu-root"] > [testID="mega-menu-column"]')).toHaveLength(3);

		wrapper.unmount();
	});
});
