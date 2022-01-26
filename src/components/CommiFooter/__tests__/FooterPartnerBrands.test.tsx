import { BlueBaseImage, Overline } from '@bluebase/components';

import { BlueBaseApp } from '@bluebase/core';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { FooterPartnerBrands } from '../FooterPartnerBrands';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBaseRnPlaceholder, Plugin];

describe('FooterPartnerBrands', () => {
	it('should render list', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FooterPartnerBrands
					items={[
						{
							href: 'https://facebook.com/1',
							name: 'Orient',
							uri: require('./logo-orient.png'),
						},
						{
							href: 'https://facebook.com/2',
							name: 'Orient',
							uri: require('./logo-orient.png'),
						},
						{
							href: 'https://facebook.com/3',
							name: 'Orient',
							uri: require('./logo-orient.png'),
						},
					]}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, FooterPartnerBrands);

		expect(
			wrapper
				.find(Overline)
				.first()
				.text()
		).toBe('Shop Our Brands');

		expect(wrapper.find(BlueBaseImage)).toHaveLength(3);

		wrapper.unmount();
	});

	it('should not render list', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FooterPartnerBrands title="Company" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, FooterPartnerBrands);

		expect(wrapper.find(BlueBaseImage).exists()).toBe(false);

		wrapper.unmount();
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FooterPartnerBrands loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, FooterPartnerBrands);

		expect(wrapper.find('Placeholder').length).toBeGreaterThan(0);

		wrapper.unmount();
	});
});
