import { BlueBaseImage, Body2 } from '@bluebase/components';

import { BlueBaseApp } from '@bluebase/core';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { FooterOverviewSection } from '../FooterOverviewSection';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBaseRnPlaceholder, Plugin];

describe('FooterOverviewSection', () => {
	it('should render list', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FooterOverviewSection tagline="Tag Line" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, FooterOverviewSection);

		expect(
			wrapper
				.find(Body2)
				.first()
				.text()
		).toBe('Tag Line');

		expect(wrapper.find(BlueBaseImage).exists()).toBe(true);

		wrapper.unmount();
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FooterOverviewSection loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, FooterOverviewSection);

		expect(wrapper.find('Placeholder').length).toBeGreaterThan(0);

		wrapper.unmount();
	});
});
