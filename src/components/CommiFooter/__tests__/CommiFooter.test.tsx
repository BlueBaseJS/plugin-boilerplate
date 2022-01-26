import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginResponsiveGrid from '@bluebase/plugin-responsive-grid';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { CommiFooter } from '../CommiFooter';
import { FooterLinkList } from '../FooterLinkList';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBaseRnPlaceholder, BlueBasePluginResponsiveGrid, Plugin];

describe('CommiFooter', () => {
	it('should render list', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<CommiFooter
					brandName="Orient"
					tagline="BlueEast (Orient Group), 26 km, Multan Rd, Maraka, Maraka Village, Lahore, Punjab 54000."
					lists={[
						{
							title: 'Company',

							items: [{ title: 'Terms of Service', href: '/' }],
						},
						{
							title: 'Company',

							items: [{ title: 'About Us', href: '/' }],
						},
						{
							title: 'Company',

							items: [{ title: 'Contact Us', href: '/' }],
						},
					]}
					apps={{
						appleAppStore: 'https://facebook.com/blueeasttech',
						googlePlayStore: 'https://facebook.com/blueeasttech',
					}}
					social={{
						items: [{ name: 'facebook', href: 'https://facebook.com/blueeasttech' }],
					}}
					partnerBrands={{
						items: [
							{
								href: 'https://facebook.com/blueeasttech',
								name: 'Orient',
								uri: require('./logo-orient.png'),
							},
						],
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, CommiFooter);

		expect(wrapper.find(FooterLinkList)).toHaveLength(3);

		wrapper.unmount();
	});
	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<CommiFooter loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, CommiFooter);

		expect(wrapper.find('Placeholder').length).toBeGreaterThan(0);

		wrapper.unmount();
	});
});
