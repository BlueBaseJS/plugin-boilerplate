import { BlueBaseApp, isMobile } from '@bluebase/core';

import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { FeatureItem } from '../FeatureItem';
import { PlaceholderLine } from 'rn-placeholder';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBaseRnPlaceholder, Plugin];

describe('FeatureItem', () => {
	it('should render content on mobile', async () => {
		(isMobile as jest.Mock).mockReturnValue(true);

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FeatureItem
					title="AI Dual Camera"
					description="The Redmi 8 comes with a 12 MP AI Dual Camera that features a 2 MP Depth Sensor."
					media={{
						thumbnail: 'https://placeimg.com/5/5/tech',
						uri: 'https://placeimg.com/400/400/tech',
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'FeatureItem');

		expect(
			wrapper
				.find('[testID="feature-item-media-container"]')
				.find('Media')
				.first()
				.prop('uri')
		).toBe('https://placeimg.com/400/400/tech');

		expect(
			wrapper
				.find('Body1[testID="feature-item-title"]')
				.last()
				.text()
		).toBe('AI Dual Camera');

		expect(
			wrapper
				.find('Body2[testID="feature-item-description"]')
				.last()
				.text()
		).toBe('The Redmi 8 comes with a 12 MP AI Dual Camera that features a 2 MP Depth Sensor.');

		wrapper.unmount();
	});

	it('should note render media', async () => {
		(isMobile as jest.Mock).mockReturnValue(true);

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FeatureItem
					title="AI Dual Camera"
					description="The Redmi 8 comes with a 12 MP AI Dual Camera that features a 2 MP Depth Sensor."
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'FeatureItem');

		expect(wrapper.find('[testID="feature-item-media-container"] Media').exists()).toBe(false);

		expect(
			wrapper
				.find('Body1[testID="feature-item-title"]')
				.last()
				.text()
		).toBe('AI Dual Camera');

		expect(
			wrapper
				.find('Body2[testID="feature-item-description"]')
				.last()
				.text()
		).toBe('The Redmi 8 comes with a 12 MP AI Dual Camera that features a 2 MP Depth Sensor.');

		wrapper.unmount();
	});

	it('should not render title', async () => {
		(isMobile as jest.Mock).mockReturnValue(true);

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FeatureItem
					description="The Redmi 8 comes with a 12 MP AI Dual Camera that features a 2 MP Depth Sensor."
					media={{
						thumbnail: 'https://placeimg.com/5/5/tech',
						uri: 'https://placeimg.com/400/400/tech',
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'FeatureItem');

		expect(
			wrapper
				.find('[testID="feature-item-media-container"]')
				.find('Media')
				.first()
				.prop('uri')
		).toBe('https://placeimg.com/400/400/tech');

		expect(wrapper.find('Body1[testID="feature-item-title"]').exists()).toBe(false);

		expect(
			wrapper
				.find('Body2[testID="feature-item-description"]')
				.last()
				.text()
		).toBe('The Redmi 8 comes with a 12 MP AI Dual Camera that features a 2 MP Depth Sensor.');

		wrapper.unmount();
	});

	it('should not render description', async () => {
		(isMobile as jest.Mock).mockReturnValue(true);

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FeatureItem
					title="AI Dual Camera"
					media={{
						thumbnail: 'https://placeimg.com/5/5/tech',
						uri: 'https://placeimg.com/400/400/tech',
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'FeatureItem');

		expect(
			wrapper
				.find('[testID="feature-item-media-container"]')
				.find('Media')
				.first()
				.prop('uri')
		).toBe('https://placeimg.com/400/400/tech');

		expect(
			wrapper
				.find('Body1[testID="feature-item-title"]')
				.last()
				.text()
		).toBe('AI Dual Camera');

		expect(wrapper.find('Body2[testID="feature-item-description"]').exists()).toBe(false);

		wrapper.unmount();
	});

	it('should render content with tech background on mobile', async () => {
		(isMobile as jest.Mock).mockReturnValue(true);

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FeatureItem
					title="AI Dual Camera"
					description="The Redmi 8 comes with a 12 MP AI Dual Camera that features a 2 MP Depth Sensor."
					media={{
						uri: 'https://placeimg.com/400/400/tech',
					}}
					background={{
						source: { uri: 'https://placeimg.com/400/400/tech' },
					}}
					backgroundDesktop={{
						source: { uri: 'https://placeimg.com/400/400/nature' },
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'FeatureItem');

		expect(
			(wrapper
				.find('BlueBaseImageBackground')
				.first()
				.prop('source') as any).uri
		).toBe('https://placeimg.com/400/400/tech');

		wrapper.unmount();
	});

	it('should render content with nature background on mobile', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FeatureItem
					title="AI Dual Camera"
					description="The Redmi 8 comes with a 12 MP AI Dual Camera that features a 2 MP Depth Sensor."
					media={{
						uri: 'https://placeimg.com/400/400/tech',
					}}
					background={{
						source: { uri: 'https://placeimg.com/400/400/tech' },
					}}
					backgroundDesktop={{
						source: { uri: 'https://placeimg.com/400/400/nature' },
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'FeatureItem');

		expect(
			(wrapper
				.find('BlueBaseImageBackground')
				.first()
				.prop('source') as any).uri
		).toBe('https://placeimg.com/400/400/nature');

		wrapper.unmount();
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FeatureItem loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'FeatureItem');

		expect(wrapper.find(PlaceholderLine).length).toBeGreaterThan(0);

		wrapper.unmount();
	});
});
