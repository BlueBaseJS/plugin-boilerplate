import { Icon, List } from '@bluebase/components';

import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import { MultiLevelSelectorListItem } from '../ListItem';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const plugins = [Plugin, BlueBasePluginMaterialUI];

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

describe('MultiLevelSelectorListItem', () => {
	it('should render title without customisation on mobile', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelectorListItem id="pizza" title="Pizza" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, List.Item);

		expect(
			wrapper
				.find('ListItem')
				.first()
				.prop('title')
		).toBe('Pizza');
	});
	it('should render loading state when loading is true', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelectorListItem loading id="pizza" title="Pizza" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MultiLevelSelectorListItem);
	});

	it('should render icon when an icon prop is given', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelectorListItem icon={<Icon />} id="pizza" title="Pizza" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MultiLevelSelectorListItem);

		expect(
			wrapper
				.find('ListItem')
				.first()
				.prop('left')
		).toBeDefined();
	});

	it('should show count when count prop is given', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelectorListItem count={123} id="pizza" title="Pizza" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MultiLevelSelectorListItem);

		expect(
			wrapper
				.find('ListItem')
				.first()
				.prop('right')
		).toBeDefined();
	});

	it('should render icon if hasChildren is true', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelectorListItem hasChildren id="pizza" title="Pizza" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MultiLevelSelectorListItem);

		expect(
			wrapper
				.find('ListItem')
				.first()
				.prop('right')
		).toBeDefined();
	});
});
