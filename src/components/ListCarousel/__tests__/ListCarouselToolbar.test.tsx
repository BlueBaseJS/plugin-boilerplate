import 'cross-fetch/polyfill';

import { BlueBaseApp, isMobile } from '@bluebase/core';

import BlueBasePluginApollo from '@bluebase/plugin-apollo';
import { ListCarouselToolbar } from '../ListCarouselToolbar';
import MaterialUiPlugin from '@bluebase/plugin-material-ui';
import Plugin from '../../../index';
import React from 'react';
import ResponsiveListSizingPlugin from '@bluebase/plugin-responsive-grid';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn(),
}));

const plugins = [BlueBasePluginApollo, MaterialUiPlugin, Plugin, ResponsiveListSizingPlugin];

describe('ListCarouselToolbar', () => {
	it('should not render left and right icons on mobile', async () => {
		(isMobile as jest.Mock).mockReturnValue(true);

		const moveBack = jest.fn();
		const moveNext = jest.fn();

		// mount
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<ListCarouselToolbar title="Hello" moveBack={moveBack} moveNext={moveNext} />
			</BlueBaseApp>
		);

		// Wait for Grid
		await waitForElement(wrapper, ListCarouselToolbar);

		expect(
			wrapper
				.find('ListItem')
				.first()
				.prop('title')
		).toBe('Hello');
		expect(wrapper.find('ListItem [name="chevron-left"]').exists()).toBe(false);
		expect(wrapper.find('ListItem [name="chevron-right"]').exists()).toBe(false);
		wrapper.unmount();
	});

	it('should render left and right icons on mobile', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const moveBack = jest.fn();
		const moveNext = jest.fn();

		// mount
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<ListCarouselToolbar title="Hello" moveBack={moveBack} moveNext={moveNext} />
			</BlueBaseApp>
		);

		// Wait for Grid
		await waitForElement(wrapper, ListCarouselToolbar);

		expect(
			wrapper
				.find('ListItem')
				.first()
				.prop('title')
		).toBe('Hello');
		expect(wrapper.find('ListItem [name="chevron-left"]').exists()).toBe(true);
		expect(wrapper.find('ListItem [name="chevron-right"]').exists()).toBe(true);
		wrapper.unmount();
	});

	it('should render a skeleton if loading is true', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const moveBack = jest.fn();
		const moveNext = jest.fn();

		// mount
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<ListCarouselToolbar title="Hello" moveBack={moveBack} moveNext={moveNext} loading />
			</BlueBaseApp>
		);

		// Wait for Grid
		await waitForElement(wrapper, ListCarouselToolbar);

		expect(wrapper.find('SkeletonListItem').exists()).toBe(true);
		wrapper.unmount();
	});
});
