import { BaseSlider } from '../BaseSlider';
import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import FilledTrack from '../FilledTrack';
import Plugin from '../../..';
import React from 'react';
import { StyleSheet } from 'react-native';
import Thumb from '../Thumb';
import Track from '../Track';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('BaseSlider', () => {
	it('should show a single thumb half way filled', async () => {
		const onSlidingStart = jest.fn();

		const wrapper = mount(
			<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
				<BaseSlider
					value={0.5}
					onSlidingStart={onSlidingStart}
					layout={{
						height: 50,
						width: 200,
						x: 50,
						y: 50,
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, BaseSlider);

		const styles = wrapper
			.find(BaseSlider)
			.find(FilledTrack)
			.find('View')
			.last()
			.prop('style') as any;

		expect((StyleSheet.flatten(styles) as any).width).toBe(100);

		wrapper.unmount();
	});

	it('should show 2 thumbs', async () => {
		const onValueChange = jest.fn();
		const onValueChange2 = jest.fn();

		const wrapper = mount(
			<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
				<BaseSlider
					value={0.5}
					value2={0.75}
					step={0.1}
					onValueChange={onValueChange}
					onValueChange2={onValueChange2}
					layout={{
						height: 50,
						width: 200,
						x: 50,
						y: 50,
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, BaseSlider);

		wrapper.unmount();
	});

	// it('should use the onSlidingComplete callback', async () => {
	// 	const onSlidingComplete = jest.fn();

	// 	const wrapper = mount(
	// 		<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
	// 			<BaseSlider
	// 				value={0.5}
	// 				value2={0.75}
	// 				step={0.1}
	// 				vertical
	// 				inverted
	// 				onSlidingComplete={onSlidingComplete}
	// 			/>
	// 		</BlueBaseApp>
	// 	);

	// 	await waitForElement(wrapper, BaseSlider);

	// 	instance.setState({
	// 		layout: {
	// 			height: 200,
	// 			width: 50,
	// 			x: 50,
	// 			y: 50,
	// 		} as any,
	// 	});

	// 	instance.onPanResponderRelease({} as any, { moveX: 160, moveY: 140 } as any);

	// 	wrapper.update();

	// 	expect(onSlidingComplete).toHaveBeenCalledTimes(1);
	// 	expect(onSlidingComplete).toHaveBeenCalledWith(0.5);

	// 	wrapper.unmount();
	// });

	it('should call onSlidingComplete when track is pressed', async () => {
		const onSlidingComplete = jest.fn();

		const wrapper = mount(
			<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
				<BaseSlider
					value={0.5}
					step={0.1}
					vertical
					onSlidingComplete={onSlidingComplete}
					inverted
					layout={{
						height: 50,
						width: 200,
						x: 50,
						y: 50,
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, BaseSlider);

		const onPressIn: any = wrapper.find('TouchableWithoutFeedback').first().prop('onPressIn');

		onPressIn({
			nativeEvent: {
				pageX: 172,
				pageY: 200,
			},
		});

		wrapper.update();

		expect(onSlidingComplete).toHaveBeenCalledTimes(1);
		expect(onSlidingComplete).toHaveBeenCalledWith(0);

		wrapper.unmount();
	});

	it('should call onSlidingComplete2 when track is pressed near thumb2', async () => {
		const onSlidingComplete = jest.fn();
		const onSlidingComplete2 = jest.fn();

		const wrapper = mount(
			<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
				<BaseSlider
					value={0.1}
					value2={0.9}
					step={0.1}
					vertical
					onSlidingComplete={onSlidingComplete}
					onSlidingComplete2={onSlidingComplete2}
					inverted
					layout={{
						height: 50,
						width: 200,
						x: 0,
						y: 0,
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, BaseSlider);

		const onPressIn: any = wrapper.find('TouchableWithoutFeedback').first().prop('onPressIn');

		onPressIn({
			nativeEvent: {
				pageX: 172,
				pageY: 200,
			},
		});

		wrapper.update();

		expect(onSlidingComplete).toHaveBeenCalledTimes(1);

		expect(onSlidingComplete2).toHaveBeenCalledTimes(0);
		// expect(onSlidingComplete2).toHaveBeenCalledWith(0);

		wrapper.unmount();
	});

	it('should not do anything if a selection is processed but there is not onValueChange', async () => {
		const onValueChange = jest.fn();

		const wrapper = mount(
			<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
				<BaseSlider
					value={0.5}
					step={0.1}
					vertical
					layout={{
						height: 50,
						width: 200,
						x: 50,
						y: 50,
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, BaseSlider);

		const onPress: any = wrapper.find(Track).prop('onPress');
		onPress({
			nativeEvent: {
				pageX: 172,
				pageY: 200,
			},
		} as any);

		expect(onValueChange).toHaveBeenCalledTimes(0);

		wrapper.unmount();
	});

	it('should not show a thumb when disabled', async () => {
		const onValueChange = jest.fn();

		const wrapper = mount(
			<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
				<BaseSlider
					disabled
					value={0.5}
					step={0.1}
					vertical
					onValueChange={onValueChange}
					layout={{
						height: 200,
						width: 200,
						x: 50,
						y: 50,
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, BaseSlider);

		const onPress: any = wrapper.find(Track).prop('onPress');
		onPress({
			nativeEvent: {
				pageX: 72,
				pageY: 148,
			},
		} as any);

		wrapper.update();

		expect(onValueChange).toHaveBeenCalledTimes(0);

		wrapper.unmount();
	});

	describe('renderThumb1', () => {
		it('should send postion as is when horizontal, !inverted & 2 values', async () => {
			const onValueChange = jest.fn();

			const wrapper = mount(
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<BaseSlider
						value={0.4}
						value2={0.7}
						step={0.1}
						onValueChange={onValueChange}
						layout={{
							height: 100,
							width: 100,
							x: 50,
							y: 50,
						}}
					/>
				</BlueBaseApp>
			);

			await waitForElement(wrapper, BaseSlider);

			expect(wrapper.find(Thumb).first().prop('position')).toMatchObject({
				height: 4,
				width: 29.999999999999993,
				x: 40,
				y: undefined,
			});

			wrapper.unmount();
		});

		it('should x = width when horizontal, !inverted & 1 value', async () => {
			const onValueChange = jest.fn();

			const wrapper = mount(
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<BaseSlider
						value={0.4}
						step={0.1}
						onValueChange={onValueChange}
						layout={{
							height: 100,
							width: 100,
							x: 50,
							y: 50,
						}}
					/>
				</BlueBaseApp>
			);

			await waitForElement(wrapper, BaseSlider);

			expect(wrapper.find(Thumb).first().prop('position')).toMatchObject({
				height: 4,
				width: 40,
				x: 40,
				y: undefined,
			});

			wrapper.unmount();
		});

		it('should set x = width + x when horizontal, inverted & 2 values', async () => {
			const onValueChange = jest.fn();

			const wrapper = mount(
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<BaseSlider
						value={0.4}
						value2={0.7}
						step={0.1}
						inverted
						onValueChange={onValueChange}
						layout={{
							height: 100,
							width: 100,
							x: 50,
							y: 50,
						}}
					/>
				</BlueBaseApp>
			);

			await waitForElement(wrapper, BaseSlider);

			expect(wrapper.find(Thumb).first().prop('position')).toMatchObject({
				height: 4,
				width: 29.999999999999993,
				x: 59.99999999999999,
				y: undefined,
			});

			wrapper.unmount();
		});

		it('should set x = width + 0 when horizontal, inverted & 2 values and no x', async () => {
			const onValueChange = jest.fn();

			const wrapper = mount(
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<BaseSlider
						value={0.4}
						value2={0.7}
						step={0.1}
						inverted
						onValueChange={onValueChange}
						layout={{
							height: 100,
							width: 100,
							x: 50,
							y: 50,
						}}
					/>
				</BlueBaseApp>
			);

			await waitForElement(wrapper, BaseSlider);

			expect(wrapper.find(Thumb).first().prop('position')).toMatchObject({
				height: 4,
				width: 29.999999999999993,
				x: 59.99999999999999,
				y: undefined,
			});

			wrapper.unmount();
		});

		it('should x = layout.width - width when horizontal, inverted & 1 value', async () => {
			const onValueChange = jest.fn();

			const wrapper = mount(
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<BaseSlider
						value={0.4}
						step={0.1}
						inverted
						onValueChange={onValueChange}
						layout={{
							height: 100,
							width: 100,
							x: 50,
							y: 50,
						}}
					/>
				</BlueBaseApp>
			);
			await waitForElement(wrapper, BaseSlider);

			expect(wrapper.find(Thumb).first().prop('position')).toMatchObject({
				height: 4,
				width: 40,
				x: 60,
				y: undefined,
			});

			wrapper.unmount();
		});

		it('should send postion as is when !horizontal, inverted & 2 values', async () => {
			const onValueChange = jest.fn();

			const wrapper = mount(
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<BaseSlider
						value={0.4}
						value2={0.7}
						step={0.1}
						vertical
						inverted
						onValueChange={onValueChange}
						layout={{
							height: 100,
							width: 100,
							x: 50,
							y: 50,
						}}
					/>
				</BlueBaseApp>
			);

			await waitForElement(wrapper, BaseSlider);

			expect(wrapper.find(Thumb).first().prop('position')).toMatchObject({
				height: 29.999999999999993,
				width: 4,
				x: undefined,
				y: 40,
			});

			wrapper.unmount();
		});

		it('should y = height when !horizontal, inverted & 1 value', async () => {
			const onValueChange = jest.fn();

			const wrapper = mount(
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<BaseSlider
						value={0.4}
						step={0.1}
						vertical
						inverted
						onValueChange={onValueChange}
						layout={{
							height: 100,
							width: 100,
							x: 50,
							y: 50,
						}}
					/>
				</BlueBaseApp>
			);

			await waitForElement(wrapper, BaseSlider);

			expect(wrapper.find(Thumb).first().prop('position')).toMatchObject({
				height: 40,
				width: 4,
				x: undefined,
				y: 40,
			});

			wrapper.unmount();
		});

		it('should set y = height + y when !horizontal, !inverted & 2 values', async () => {
			const onValueChange = jest.fn();

			const wrapper = mount(
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<BaseSlider
						value={0.4}
						value2={0.7}
						step={0.1}
						vertical
						inverted
						onValueChange={onValueChange}
						layout={{
							height: 100,
							width: 100,
							x: 50,
							y: 50,
						}}
					/>
				</BlueBaseApp>
			);

			await waitForElement(wrapper, BaseSlider);

			expect(wrapper.find(Thumb).first().prop('position')).toMatchObject({
				height: 29.999999999999993,
				width: 4,
				x: undefined,
				y: 40,
			});

			wrapper.unmount();
		});

		it('should set y = height + 0 when horizontal, !inverted & 2 values and no y', async () => {
			const onValueChange = jest.fn();

			const wrapper = mount(
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<BaseSlider
						value={0.4}
						value2={0.7}
						step={0.1}
						vertical
						onValueChange={onValueChange}
						layout={{
							height: 100,
							width: 100,
							x: 50,
							y: 50,
						}}
					/>
				</BlueBaseApp>
			);

			await waitForElement(wrapper, BaseSlider);

			expect(wrapper.find(Thumb).first().prop('position')).toMatchObject({
				height: 29.999999999999993,
				width: 4,
				x: undefined,
				y: 59.99999999999999,
			});

			wrapper.unmount();
		});
	});
});
