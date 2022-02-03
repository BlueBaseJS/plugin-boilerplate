import { StyleSheet, ViewStyle } from 'react-native';

import { BaseCircularSlider } from '../BaseCircularSlider';
import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import Plugin from '../../..';
import React from 'react';
import Thumb from '../Thumb';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('Thumb', () => {
	it('should set borderRadius half of thumbSize', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI]}>
				<Thumb
					{...(BaseCircularSlider.defaultProps as any)}
					number={1}
					value={0.5}
					thumbSize={10}
					startAngle={60}
					endAngle={300}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Thumb);

		const style = wrapper.find('View').last().prop('style');

		const flattenedStyle: ViewStyle = StyleSheet.flatten(style as any);

		expect(flattenedStyle.borderRadius).toBe(5);

		wrapper.unmount();
	});

	it('should use default borderRadius if thumbSize is not provided', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI]}>
				<Thumb
					{...(BaseCircularSlider.defaultProps as any)}
					number={1}
					value={0.5}
					startAngle={60}
					endAngle={300}
					thumbSize={undefined as any}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Thumb);

		const style = wrapper.find('View').last().prop('style');

		const flattenedStyle: ViewStyle = StyleSheet.flatten(style as any);

		expect(flattenedStyle.borderRadius).toBe(4);

		wrapper.unmount();
	});

	it('should use thumbProps.style prop', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI]}>
				<Thumb
					{...(BaseCircularSlider.defaultProps as any)}
					number={1}
					value={0.5}
					thumbSize={10}
					startAngle={60}
					endAngle={300}
					thumbProps={{
						style: {
							backgroundColor: 'green',
						},
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Thumb);

		const style = wrapper.find('View').last().prop('style');

		const flattenedStyle: ViewStyle = StyleSheet.flatten(style as any);

		expect(flattenedStyle.backgroundColor).toBe('green');

		wrapper.unmount();
	});

	it('should use card background color if thumbTintColor is undefined', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI]}>
				<Thumb
					{...(BaseCircularSlider.defaultProps as any)}
					number={1}
					value={0.5}
					thumbSize={10}
					startAngle={60}
					endAngle={300}
					thumbTintColor={undefined}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Thumb);

		const style = wrapper.find('View').last().prop('style');

		const flattenedStyle: ViewStyle = StyleSheet.flatten(style as any);

		expect(flattenedStyle.backgroundColor).toBe('#ffffff');

		wrapper.unmount();
	});
});
