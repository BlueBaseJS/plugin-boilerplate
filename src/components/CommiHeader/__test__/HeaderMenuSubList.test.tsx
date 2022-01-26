import { BlueBaseApp } from '@bluebase/core';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { HeaderMenuSubList } from '../HeaderMenuSubList';
import { HeaderMenuSubListItem } from '../HeaderMenuSubListItem';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBaseRnPlaceholder, Plugin];

const items = [
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
];

describe('HeaderMenuSubList', () => {
	it('should render list', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<HeaderMenuSubList items={items} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, HeaderMenuSubList);

		expect(wrapper.find(HeaderMenuSubListItem)).toHaveLength(5);

		expect(wrapper.find('[testID="header-menu-sublist-title"]').exists()).toBe(false);

		wrapper.unmount();
	});

	it('should render empty list with title', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<HeaderMenuSubList title="Company" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, HeaderMenuSubList);

		expect(wrapper.find('HeaderMenuSubListItem')).toHaveLength(0);

		expect(
			wrapper
				.find('[testID="header-menu-sublist-title"]')
				.last()
				.text()
		).toBe('Company');

		wrapper.unmount();
	});
});
