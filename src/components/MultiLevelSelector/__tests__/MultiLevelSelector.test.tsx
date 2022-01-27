import { BlueBaseApp, getComponent } from '@bluebase/core';
import { MultiLevelSelectorItem, MultiLevelSelectorProps } from '../MultiLevelSelector';

import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { waitForElement } from 'enzyme-async-helpers';

const plugins = [Plugin, BlueBasePluginMaterialUI];
const MultiLevelSelector = getComponent<MultiLevelSelectorProps>('MultiLevelSelector');

const items: MultiLevelSelectorItem[] = [
	{
		hasChildren: true,
		id: 'punjab',
		title: 'Punjab',
	},
	{
		hasChildren: true,
		id: 'sindh',
		title: 'Sindh',
	},
	{
		id: 'balochistan',
		title: 'Balochistan',
	},
	{
		hasChildren: true,
		id: 'lahore',
		parentId: 'punjab',
		title: 'Lahore',
	},
	{
		id: 'multan',
		parentId: 'punjab',
		title: 'Multan',
	},
	{
		hasChildren: false,
		id: 'thokar',
		parentId: 'lahore',
		title: 'Thokar Niaz Baig',
	},
	{
		id: 'karachi',
		parentId: 'sindh',
		title: 'Karachi',
	},
];

describe('MultiLevelSelector', () => {
	it('should render MultiLevelSelector with no items', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelector />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'MultiLevelSelector');

		expect(wrapper.find('ListItem').exists()).toBe(false);

		expect(
			(wrapper
				.find('TextInput')
				.first()
				.prop('value') as string).length
		).toEqual(0);
	});

	it('should render MultiLevelSelector', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelector items={items} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'MultiLevelSelector');

		expect(wrapper.find('ListItem[title="Punjab"]').exists()).toBe(true);
		expect(wrapper.find('ListItem[title="Sindh"]').exists()).toBe(true);
		expect(wrapper.find('ListItem[title="Balochistan"]').exists()).toBe(true);

		expect(
			(wrapper
				.find('TextInput')
				.first()
				.prop('value') as string).length
		).toEqual(0);
	});

	it('should have initialy selected fields', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelector
					items={items}
					values={[
						{
							hasChildren: true,
							id: 'punjab',
							title: 'Punjab',
						},
						{
							hasChildren: true,
							id: 'lahore',
							parentId: 'punjab',
							title: 'Lahore',
						},
					]}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'MultiLevelSelector');

		expect(wrapper.find('ListItem[title="Punjab"]').exists()).toBe(false);

		expect(wrapper.find('Button[title="Punjab"]').exists()).toBe(true);
		expect(wrapper.find('Button[title="Lahore"]').exists()).toBe(true);

		expect(wrapper.find('ListItem[title="Thokar Niaz Baig"]').exists()).toBe(true);
	});

	it('should select address and render subfields', async () => {
		const onValueChange = jest.fn((_selection: MultiLevelSelectorItem[]) => null);
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelector items={items} onChangeValue={onValueChange} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'MultiLevelSelector');

		expect(wrapper.find('ListItem[title="Punjab"]').exists()).toBe(true);

		const onPress: any = wrapper
			.find('ListItem[title="Punjab"]')
			.first()
			.prop('onPress');
		onPress();

		await wait(200);

		wrapper.update();

		expect(wrapper.find('Button[title="Punjab"]').exists()).toBe(true);

		expect(wrapper.find('ListItem[title="Lahore"]').exists()).toBe(true);
		expect(wrapper.find('ListItem[title="Multan"]').exists()).toBe(true);

		const _onPress: any = wrapper
			.find('ListItem[title="Lahore"]')
			.first()
			.prop('onPress');
		_onPress();

		await wait(200);

		wrapper.update();

		expect(wrapper.find('ListItem[title="Thokar Niaz Baig"]').exists()).toBe(true);

		const pressButton: any = wrapper
			.find('Button[title="Punjab"]')
			.first()
			.prop('onPress');
		pressButton();

		await wait(200);

		wrapper.update();

		expect(wrapper.find('ListItem[title="Thokar Niaz Baig"]').exists()).toBe(false);
		expect(wrapper.find('ListItem[title="Lahore"]').exists()).toBe(false);

		expect(wrapper.find('ListItem[title="Punjab"]').exists()).toBe(true);
	});

	it('should test onValueChange on change address', async () => {
		const onValueChange = jest.fn((_selection: MultiLevelSelectorItem[]) => null);
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelector items={items} onChangeValue={onValueChange} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'MultiLevelSelector');

		expect(wrapper.find('ListItem[title="Punjab"]').exists()).toBe(true);

		const onPress: any = wrapper
			.find('ListItem[title="Punjab"]')
			.first()
			.prop('onPress');
		onPress();

		wrapper.update();

		const _onPress: any = wrapper
			.find('ListItem[title="Lahore"]')
			.first()
			.prop('onPress');
		_onPress();

		wrapper.update();

		const onPressChange: any = wrapper
			.find('ListItem[title="Thokar Niaz Baig"]')
			.first()
			.prop('onPress');
		onPressChange();

		await wait(200);

		expect(onValueChange).toBeCalled();
		expect(onValueChange).toBeCalledTimes(1);
		expect(onValueChange).toBeCalledWith([
			{
				hasChildren: true,
				id: 'punjab',
				title: 'Punjab',
			},
			{
				hasChildren: true,
				id: 'lahore',
				parentId: 'punjab',
				title: 'Lahore',
			},
			{
				hasChildren: false,
				id: 'thokar',
				parentId: 'lahore',
				title: 'Thokar Niaz Baig',
			},
		]);
	});

	it('should test if ref.current is null', async () => {
		const onValueChange = jest.fn((_selection: MultiLevelSelectorItem[]) => null);
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelector
					items={items}
					onChangeValue={onValueChange}
					values={[{ id: 'punjab', title: 'Punjab' }]}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'MultiLevelSelector');

		expect(wrapper.find('ListItem[title="Lahore"]').exists()).toBe(true);

		const onPress: any = wrapper
			.find('ListItem[title="Lahore"]')
			.first()
			.prop('onPress');
		onPress();

		await wait(200);

		wrapper.update();

		const goToParent: any = wrapper
			.find('MultiLevelSelectorBreadcrumbComponent')
			.first()
			.prop('onItemPress');
		await goToParent(-2);
		await goToParent(2);

		expect(wrapper.find('ListItem[title="Thokar Niaz Baig"]').exists()).toBe(true);
	});

	it('should if no onValueChange', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelector
					items={items}
					values={[{ id: 'punjab', title: 'Punjab' }, { id: 'lahore', title: 'Lahore' }]}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'MultiLevelSelector');

		expect(wrapper.find('ListItem[title="Thokar Niaz Baig"]').exists()).toBe(true);

		const onPress: any = wrapper
			.find('ListItem[title="Thokar Niaz Baig"]')
			.first()
			.prop('onPress');
		onPress();

		await wait(200);

		wrapper.update();

		expect(wrapper.find('ListItem[title="Thokar Niaz Baig"]').exists()).toBe(true);
	});
});

describe('SlidingPane', () => {
	it('should test sliding pane', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MultiLevelSelector items={items} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'MultiLevelSelector');

		const ins: any = wrapper
			.find('SlidingPane')
			.first()
			.instance();

		const prevState = ins.state.leftAnim;

		const callback = jest.fn();

		ins.warpCenter(callback);
		ins.slideLeft(callback);

		expect(callback).toBeCalled();
		expect(callback).toBeCalledTimes(1);

		ins.slideRight(callback);

		expect(prevState).not.toBe(ins.state.leftAnim);

		expect(callback).toBeCalled();
		expect(callback).toBeCalledTimes(2);
	});
});
