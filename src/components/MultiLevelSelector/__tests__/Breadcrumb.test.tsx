/* eslint-disable react/jsx-no-bind */
import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import { MultiLevelSelectorBreadcrumb } from '../Breadcrumb';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const plugins = [Plugin, BlueBasePluginMaterialUI];

describe('Breadcrumb', () => {
	it('should call onContentSizeChange function', async () => {
		const items = [
			{ id: 'pizza', title: 'Pizza', count: 1356, hasChildren: true },
			{ id: 'burger', title: 'Burger', hasChildren: true },
			{ id: 'pasta', title: 'Pasta', count: 16 },
		];
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelectorBreadcrumb onItemPress={() => {}} values={items} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MultiLevelSelectorBreadcrumb);

		const onContentSizeChange: any = wrapper
			.find('[testID="on-content-size-change"]')
			.first()
			.prop('onContentSizeChange');
		const onContent = jest.fn(onContentSizeChange);
		onContent();
		expect(onContent).toHaveBeenCalled();
	});
	it('should trigger onPress when button is pressed', async () => {
		const items = [
			{ id: 'pizza', title: 'Pizza', count: 1356, hasChildren: true },
			{ id: 'burger', title: 'Burger', hasChildren: true },
			{ id: 'pasta', title: 'Pasta', count: 16 },
		];
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelectorBreadcrumb onItemPress={() => {}} values={items} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MultiLevelSelectorBreadcrumb);

		const onPressButton: any = wrapper
			.find('Button [testID="on-Press-test"]')
			.first()
			.prop('onPress');
		const onPress = jest.fn(onPressButton);
		onPress(1);
		expect(onPress).toHaveBeenCalled();
	});
});
