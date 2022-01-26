import { Body2, Subtitle1 } from '@bluebase/components';

import { BlueBaseApp } from '@bluebase/core';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { FooterLinkList } from '../FooterLinkList';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBaseRnPlaceholder, Plugin];

describe('FooterLinkList', () => {
	it('should render list', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FooterLinkList
					title="Company"
					items={[
						{ title: 'About Us', href: '/' },
						{ title: 'Contact Us', href: '/' },
					]}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, FooterLinkList);

		expect(
			wrapper
				.find(Subtitle1)
				.first()
				.text()
		).toBe('Company');

		expect(
			wrapper
				.find(Body2)
				.first()
				.text()
		).toBe('About Us');

		expect(
			wrapper
				.find(Body2)
				.last()
				.text()
		).toBe('Contact Us');

		wrapper.unmount();
	});

	it('should not render list', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FooterLinkList title="Company" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, FooterLinkList);

		expect(wrapper.find(Body2).exists()).toBe(false);

		wrapper.unmount();
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FooterLinkList loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, FooterLinkList);

		expect(wrapper.find('Placeholder').length).toBeGreaterThan(0);

		wrapper.unmount();
	});
});
