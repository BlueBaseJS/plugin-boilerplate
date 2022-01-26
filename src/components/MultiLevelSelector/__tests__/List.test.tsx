import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import { MultiLevelSelectorList } from '../List';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const plugins = [Plugin, BlueBasePluginMaterialUI];

// jest.mock('@bluebase/core/dist/utils/Screen', () => ({
// 	isMobile: jest.fn().mockReturnValue(true),
// }));

describe('MultiLevelSelectorList', () => {
	it('should show search field when searchable prop is true', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelectorList
					searchable
					items={[
						{ id: 'pizza', title: 'Pizza', count: 1356, hasChildren: true },
						{ id: 'burger', title: 'Burger', hasChildren: true },
						{ id: 'pasta', title: 'Pasta', count: 16 },
					]}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MultiLevelSelectorList);

		expect(
			(wrapper
				.find('TextInput')
				.first()
				.prop('value') as string).length
		).toEqual(0);
	});

	it('should NOT show search field when searchable prop is false', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelectorList
					searchable={false}
					items={[
						{ id: 'pizza', title: 'Pizza', count: 1356, color: 'rgb(228, 120, 51)' },
						{ id: 'burger', title: 'Burger' },
						{ id: 'pasta', title: 'Pasta', count: 16, color: '#F5F5DC' },
					]}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MultiLevelSelectorList);

		expect(wrapper.find('MultiLevelSelectorList TextInput').length).toBe(0);
	});

	it('should NOT show toolbar when there is not clear all button or search field', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelectorList
					searchable={false}
					items={[
						{ id: 'pizza', title: 'Pizza', count: 1356, color: 'rgb(228, 120, 51)' },
						{ id: 'burger', title: 'Burger' },
						{ id: 'pasta', title: 'Pasta', count: 16, color: '#F5F5DC' },
					]}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MultiLevelSelectorList);

		expect(wrapper.find('MultiLevelSelectorList [testID="filter-facet-list-toolbar"]').length).toBe(
			0
		);
	});

	it('should render 3 list items', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelectorList
					items={[
						{ id: 'pizza', title: 'Pizza', count: 1356, color: 'rgb(228, 120, 51)' },
						{ id: 'burger', title: 'Burger' },
						{ id: 'pasta', title: 'Pasta', count: 16, color: '#F5F5DC' },
					]}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MultiLevelSelectorList);

		expect(wrapper.find('ListItem[title="Pizza"]').exists()).toBe(true);
		expect(wrapper.find('ListItem[title="Burger"]').exists()).toBe(true);
		expect(wrapper.find('ListItem[title="Pasta"]').exists()).toBe(true);

		// Nothing should happen when item is pressed as there is no onChangeValue listener
		const onPress: any = wrapper
			.find('ListItem[title="Burger"]')
			.first()
			.prop('onPress');

		onPress();
	});

	it('should fire onChangeValue callback with the new value when list item is pressed', async () => {
		const onChangeValue = jest.fn();

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelectorList
					onChangeValue={onChangeValue}
					items={[
						{ id: 'pizza', title: 'Pizza', count: 1356, color: 'rgb(228, 120, 51)' },
						{ id: 'burger', title: 'Burger' },
						{ id: 'pasta', title: 'Pasta', count: 16, color: '#F5F5DC' },
					]}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MultiLevelSelectorList);

		expect(wrapper.find('ListItem[title="Pizza"]').exists()).toBe(true);
		expect(wrapper.find('ListItem[title="Burger"]').exists()).toBe(true);
		expect(wrapper.find('ListItem[title="Pasta"]').exists()).toBe(true);

		// Nothing should happen when item is pressed as there is no onChangeValue listener
		const onPress: any = wrapper
			.find('ListItem[title="Burger"]')
			.first()
			.prop('onPress');

		onPress();

		expect(onChangeValue).toHaveBeenCalledTimes(1);
		expect(onChangeValue).toHaveBeenCalledWith({ id: 'burger', title: 'Burger' });
	});

	it('should show search field and search typed field', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelectorList
					searchable
					items={[
						{ id: 'pizza', title: 'Pizza', count: 1356, hasChildren: true },
						{ id: 'burger', title: 'Burger', hasChildren: true },
						{ id: 'pasta', title: 'Pasta', count: 16 },
					]}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MultiLevelSelectorList);

		expect(
			(wrapper
				.find('TextInput')
				.first()
				.prop('value') as string).length
		).toEqual(0);

		const onChangeText: any = wrapper
			.find('TextInput')
			.first()
			.prop('onChangeText');

		onChangeText('pi');

		wrapper.update();

		expect(wrapper.find('ListItem[title="Pizza"]').exists()).toBe(true);
		expect(wrapper.find('ListItem[title="Burger"]').exists()).toBe(false);
		expect(wrapper.find('ListItem[title="Pasta"]').exists()).toBe(false);

		const _onChangeText: any = wrapper
			.find('TextInput')
			.first()
			.prop('onChangeText');

		_onChangeText();

		wrapper.update();
		expect(wrapper.find('ListItem').exists()).toBe(true);
	});

	it('should show search field and search typed field not exist', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelectorList
					searchable
					items={[
						{ id: 'pizza', title: 'Pizza', count: 1356, hasChildren: true },
						{ id: 'burger', title: 'Burger', hasChildren: true },
						{ id: 'pasta', title: '', count: 16 },
					]}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MultiLevelSelectorList);

		expect(
			(wrapper
				.find('TextInput')
				.first()
				.prop('value') as string).length
		).toEqual(0);

		const onChangeText: any = wrapper
			.find('TextInput')
			.first()
			.prop('onChangeText');

		onChangeText('k');

		wrapper.update();
		expect(wrapper.find('ListItem').exists()).toBe(false);
	});
});
