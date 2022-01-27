import { BlueBaseApp } from '@bluebase/core';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { ExternalLink } from '../../ExternalLink';
import { FooterSocialLinks } from '../FooterSocialLinks';
import Plugin from '../../..';
import React from 'react';
import { Subtitle1 } from '@bluebase/components';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBaseRnPlaceholder, Plugin];

describe('FooterSocialLinks', () => {
	it('should render list', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FooterSocialLinks
					items={[
						{ name: 'facebook', href: 'https://facebook.com/blueeasttech' },
						{ name: 'twitter', href: '/' },
						{ name: 'instagram', href: '/' },
						{ name: 'youtube', href: '/' },
					]}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, FooterSocialLinks);

		expect(
			wrapper
				.find(Subtitle1)
				.first()
				.text()
		).toBe('Follow Us');

		expect(
			wrapper
				.find(ExternalLink)
				.first()
				.prop('name')
		).toBe('facebook');

		expect(wrapper.find(ExternalLink)).toHaveLength(4);

		wrapper.unmount();
	});

	it('should not render list', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FooterSocialLinks title="Company" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, FooterSocialLinks);

		expect(wrapper.find(ExternalLink).exists()).toBe(false);

		wrapper.unmount();
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FooterSocialLinks loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, FooterSocialLinks);

		expect(wrapper.find('Placeholder').length).toBeGreaterThan(0);

		wrapper.unmount();
	});
});
