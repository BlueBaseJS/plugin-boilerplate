import { BlueBaseApp } from '@bluebase/core';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { HeaderMenu } from '../HeaderMenu';
import { HeaderMenuItem } from '../HeaderMenuItem';
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

describe('HeaderMenu', () => {
	it('should render list', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<HeaderMenu items={items} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, HeaderMenu);

		expect(wrapper.find(HeaderMenuItem)).toHaveLength(5);

		wrapper.unmount();
	});
});
