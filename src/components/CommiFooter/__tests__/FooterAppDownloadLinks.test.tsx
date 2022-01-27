import { BlueBaseImage, Subtitle1 } from '@bluebase/components';

import { BlueBaseApp } from '@bluebase/core';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { FooterAppDownloadLinks } from '../FooterAppDownloadLinks';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBaseRnPlaceholder, Plugin];

describe('FooterAppDownloadLinks', () => {
	it('should render list', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FooterAppDownloadLinks
					appleAppStore="https://facebook.com/blueeasttech"
					googlePlayStore="https://facebook.com/blueeasttech"
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, FooterAppDownloadLinks);

		expect(
			wrapper
				.find(Subtitle1)
				.first()
				.text()
		).toBe('Downloads');

		expect(wrapper.find('BlueBaseImage[testID="AppleAppStoreBadge"]').exists()).toBe(true);
		expect(wrapper.find('BlueBaseImage[testID="GooglePlayStoreBadge"]').exists()).toBe(true);

		wrapper.unmount();
	});

	it('should not render list', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FooterAppDownloadLinks title="Company" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, FooterAppDownloadLinks);

		expect(wrapper.find(BlueBaseImage).exists()).toBe(false);

		wrapper.unmount();
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FooterAppDownloadLinks loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, FooterAppDownloadLinks);

		expect(wrapper.find('Placeholder').length).toBeGreaterThan(0);

		wrapper.unmount();
	});
});
