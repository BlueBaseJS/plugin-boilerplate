import { BlueBaseApp } from '@bluebase/core';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { Media } from '../Media';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBaseRnPlaceholder, Plugin];

describe('FeatureItem', () => {
	it('should render media', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Media uri="https://placeimg.com/400/400/tech" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Media');

		expect(
			(wrapper
				.find('ProgressiveImage_BlueBaseImage')
				.first()
				.prop('source') as any).uri
		).toBe('https://placeimg.com/400/400/tech');

		wrapper.unmount();
	});

	it('should render error for video', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Media type="video" uri="https://placeimg.com/400/400/tech" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Media');

		expect(
			wrapper
				.find('ComponentState')
				.first()
				.prop('title')
		).toBe('Unknown Media Type');

		wrapper.unmount();
	});

	// it('should show loading state', async () => {
	// 	const wrapper = mount(
	// 		<BlueBaseApp plugins={plugins}>
	// 			<Media loading />
	// 		</BlueBaseApp>
	// 	);

	// 	await waitForElement(wrapper, 'FeatureItem');

	// 	expect(wrapper.find('Placeholder').length).toBeGreaterThan(0);

	// 	wrapper.unmount();
	// });
});
