import { BlueBaseApp, getComponent } from '@bluebase/core';

import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import { CollapsibleProps } from '../Collapsible';
import { Placeholder } from 'rn-placeholder';
import Plugin from '../../..';
import React from 'react';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const plugins = [Plugin, BlueBasePluginMaterialUI];

const Collapsible = getComponent<CollapsibleProps>('Collapsible');

describe('Collapsible', () => {
	it('should render a title and children', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Collapsible title="Image">
					<Text testID="child">Hello</Text>
				</Collapsible>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Collapsible');

		expect(
			wrapper
				.find('Collapsible Overline Text')
				.last()
				.text()
		).toBe('Image');

		expect(
			wrapper
				.find('Collapsible [testID="child"]')
				.last()
				.text()
		).toBe('Hello');
	});

	it('should render a title but no children when open is false', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Collapsible title="Image" open={false}>
					<Text testID="child">Hello</Text>
				</Collapsible>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Collapsible');

		expect(
			wrapper
				.find('Collapsible Overline Text')
				.last()
				.text()
		).toBe('Image');

		expect(wrapper.find('Collapsible [testID="child"]').length).toBe(0);
	});

	it('should toggle children when title is pressed', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Collapsible title="Image" open={false}>
					<Text testID="child">Hello</Text>
				</Collapsible>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Collapsible');

		expect(
			wrapper
				.find('Collapsible Overline Text')
				.last()
				.text()
		).toBe('Image');

		expect(wrapper.find('Collapsible [testID="child"]').length).toBe(0);

		const onPress: any = wrapper
			.find('Collapsible TouchableItem')
			.first()
			.prop('onPress');

		onPress();

		wrapper.update();

		expect(
			wrapper
				.find('Collapsible [testID="child"]')
				.last()
				.text()
		).toBe('Hello');
	});

	it('should use onChangeState handler when state is toggled', async () => {
		const onChangeState = jest.fn();

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Collapsible title="Image" open={false} onChangeState={onChangeState}>
					<Text testID="child">Hello</Text>
				</Collapsible>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Collapsible');

		expect(
			wrapper
				.find('Collapsible Overline Text')
				.last()
				.text()
		).toBe('Image');

		expect(wrapper.find('Collapsible [testID="child"]').length).toBe(0);

		const onPress: any = wrapper
			.find('Collapsible TouchableItem')
			.first()
			.prop('onPress');

		expect(onChangeState).toHaveBeenCalledTimes(0);

		onPress();
		wrapper.update();

		expect(onChangeState).toHaveBeenCalledTimes(1);
		expect(onChangeState).toHaveBeenLastCalledWith(true);
	});

	it('should show loading state without children', async () => {
		const onChangeState = jest.fn();

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Collapsible title="Image" open={false} onChangeState={onChangeState} loading>
					<Text testID="child">Hello</Text>
				</Collapsible>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Collapsible');

		expect(
			wrapper.find('[testID="collapsible-skeleton"]').find(Placeholder).length
		).toBeGreaterThan(0);
		expect(wrapper.find('[testID="collapsible-skeleton"] [testID="child"]').length).toBe(0);

		wrapper.unmount();
	});

	it('should show loading state with children', async () => {
		const onChangeState = jest.fn();

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Collapsible title="Image" open onChangeState={onChangeState} loading>
					<Text testID="child">Hello</Text>
				</Collapsible>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Collapsible');

		expect(
			wrapper.find('[testID="collapsible-skeleton"]').find(Placeholder).length
		).toBeGreaterThan(0);
		expect(wrapper.find('[testID="collapsible-skeleton"] [testID="child"]').length).toBeGreaterThan(
			0
		);

		wrapper.unmount();
	});
});
