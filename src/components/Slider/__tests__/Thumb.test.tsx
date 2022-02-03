import { StyleSheet, ViewStyle } from 'react-native';

import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import Plugin from '../../..';
import React from 'react';
import { SliderDefaultProps } from '../BaseSlider';
import Thumb from '../Thumb';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('Thumb', () => {
	it('should set borderRadius half of thumbSize', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI]}>
				<Thumb
					{...(SliderDefaultProps as any)}
					number={1}
					position={{
						height: 100,
						width: 100,
						x: 72,
						y: 148,
					}}
					parentLayout={{
						height: 200,
						width: 200,
						x: 50,
						y: 50,
					}}
					value={0.5}
					thumbSize={10}
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
					{...(SliderDefaultProps as any)}
					number={1}
					position={{
						height: 100,
						width: 100,
						x: 72,
						y: 148,
					}}
					parentLayout={{
						height: 200,
						width: 200,
						x: 50,
						y: 50,
					}}
					value={0.5}
					thumbSize={undefined}
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
					{...(SliderDefaultProps as any)}
					number={1}
					position={{
						height: 100,
						width: 100,
						x: 72,
						y: 148,
					}}
					parentLayout={{
						height: 200,
						width: 200,
						x: 50,
						y: 50,
					}}
					value={0.5}
					thumbProps={{
						style: {
							backgroundColor: 'green',
						},
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Thumb);
		// expect(wrapper).toMatchSnapshot();
		const style = wrapper.find('View').last().prop('style');

		const flattenedStyle: ViewStyle = StyleSheet.flatten(style as any);

		expect(flattenedStyle.backgroundColor).toBe('green');

		wrapper.unmount();
	});
});
