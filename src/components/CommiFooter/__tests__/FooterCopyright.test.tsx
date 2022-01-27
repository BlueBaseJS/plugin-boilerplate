import { BlueBaseApp } from '@bluebase/core';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { FooterCopyright } from '../FooterCopyright';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBaseRnPlaceholder, Plugin];

describe('FooterCopyright', () => {
	it('should render media', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FooterCopyright brandName="Orient" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, FooterCopyright);

		expect(
			wrapper
				.find(FooterCopyright)
				.first()
				.text()
		).toBe('© 2020 Orient. Powered by Commi. Developed at BlueEast.');

		wrapper.unmount();
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FooterCopyright loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, FooterCopyright);

		expect(wrapper.find('Placeholder').length).toBeGreaterThan(0);

		wrapper.unmount();
	});
});
