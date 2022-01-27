import { BaseCircularSlider } from '../BaseCircularSlider';
import { CircularSlider } from '../CircularSlider';
import { FilledTrack } from '../FilledTrack';
import React from 'react';
import { View } from 'react-native';
import { mount } from 'enzyme';

describe('CircularSlider', () => {
	it('should show a single thumb half way filled', async () => {
		const onSlidingStart = jest.fn();

		const wrapper = mount(
			<CircularSlider
				value={0.5}
				onSlidingStart={onSlidingStart}
				startAngle={60}
				endAngle={300}
				layout={{
					x: 50,
					y: 50,

					height: 100,
					width: 100,
				}}
			/>
		);

		expect(wrapper.find(CircularSlider).find(FilledTrack).prop('startAngle')).toBe(60);
		expect(wrapper.find(CircularSlider).find(FilledTrack).prop('endAngle')).toBe(180);

		// const onPress: any = wrapper.find(FilledTrack).prop('onPress');

		// onPress({
		// 	nativeEvent: { pageX: 72, pageY: 148 },
		// });

		// expect(onSlidingStart).toHaveBeenCalledTimes(1);
		// expect(onSlidingStart).toHaveBeenCalledWith(0.13112000297660747);

		wrapper.unmount();
	});

	it('should not render anything when size is 0', async () => {
		const onSlidingStart = jest.fn();

		const wrapper = mount(
			<CircularSlider
				size={0}
				value={0.5}
				onSlidingStart={onSlidingStart}
				startAngle={60}
				endAngle={300}
				layout={{
					x: 50,
					y: 50,

					height: 100,
					width: 100,
				}}
			/>
		);

		expect(wrapper.find(BaseCircularSlider).children()).toHaveLength(0);

		wrapper.unmount();
	});

	it('should show 2 thumbs', async () => {
		const onValueChange = jest.fn();
		const onValueChange2 = jest.fn();

		const wrapper = mount(
			<CircularSlider
				value={0.5}
				value2={0.75}
				onValueChange={onValueChange}
				onValueChange2={onValueChange2}
				startAngle={60}
				endAngle={300}
				step={0.1}
				ThumbComponent={View as any}
				ThumbComponent2={View as any}
				layout={{
					x: 50,
					y: 50,

					height: 100,
					width: 100,
				}}
			/>
		);

		expect(wrapper.find(CircularSlider).find(FilledTrack).prop('startAngle')).toBe(180);
		expect(wrapper.find(CircularSlider).find(FilledTrack).prop('endAngle')).toBe(240);

		const onPress: any = wrapper.find(FilledTrack).prop('onPress');
		onPress({
			nativeEvent: { pageX: 160, pageY: 140 },
		});

		expect(onValueChange).toHaveBeenCalledTimes(0);

		expect(onValueChange2).toHaveBeenCalledTimes(1);
		expect(onValueChange2).toHaveBeenCalledWith(0.7);

		wrapper.unmount();
	});

	it('should use the onSlidingComplete callback', async () => {
		const onSlidingComplete = jest.fn();

		const wrapper = mount(
			<CircularSlider
				value={0.5}
				onSlidingComplete={onSlidingComplete}
				startAngle={60}
				endAngle={300}
				step={0.1}
				layout={{
					x: 50,
					y: 50,

					height: 100,
					width: 100,
				}}
			/>
		);

		const onPress: any = wrapper.find(FilledTrack).prop('onPress');
		onPress({
			nativeEvent: { pageX: 160, pageY: 140 },
		});

		expect(onSlidingComplete).toHaveBeenCalledTimes(1);
		expect(onSlidingComplete).toHaveBeenCalledWith(0.7);

		wrapper.unmount();
	});

	it('should not do anything if a selection is processed but there is not onValueChange', async () => {
		const onValueChange = jest.fn();

		const wrapper = mount(
			<CircularSlider
				value={0.5}
				startAngle={60}
				endAngle={300}
				layout={{
					x: 50,
					y: 50,

					height: 100,
					width: 100,
				}}
			/>
		);

		const onPress: any = wrapper.find(FilledTrack).prop('onPress');
		onPress({
			nativeEvent: { pageX: 172, pageY: 200 },
		});

		expect(onValueChange).toHaveBeenCalledTimes(0);

		wrapper.unmount();
	});

	// it('should not fire callback if positionToValue returns undefined', async () => {
	// 	const onSlidingComplete = jest.fn();

	// 	const wrapper = mount(
	// 		<CircularSlider
	// 			value={0.5}
	// 			onSlidingComplete={onSlidingComplete}
	// 			startAngle={60}
	// 			endAngle={300}
	// 			step={0.1}
	// 			layout={{
	// 				x: 50,
	// 				y: 50,

	// 				height: 100,
	// 				width: 100,
	// 			}}
	// 		/>
	// 	);

	// 	const instance = wrapper.instance() as CircularSlider;

	// 	instance.positionToValue = () => undefined;

	// 	instance.setState({
	// 		layout: {
	// 			x: 50,
	// 			y: 50,
	// 		} as any,
	// 	});

	// 	instance.onPanResponderRelease({} as any, { moveX: 160, moveY: 140 } as any);

	// 	wrapper.update();

	// 	expect(onSlidingComplete).toHaveBeenCalledTimes(0);

	// 	wrapper.unmount();
	// });

	it('should not show a thumb when disabled', async () => {
		const onValueChange = jest.fn();

		const wrapper = mount(
			<CircularSlider
				disabled
				value={0.5}
				onValueChange={onValueChange}
				startAngle={60}
				endAngle={300}
				layout={{
					x: 50,
					y: 50,

					height: 100,
					width: 100,
				}}
			/>
		);

		expect(wrapper.find(CircularSlider).find('[id="thumb1"]').exists()).toBe(false);

		const onPress: any = wrapper.find(FilledTrack).prop('onPress');
		onPress({
			nativeEvent: { pageX: 72, pageY: 148 },
		});

		expect(onValueChange).toHaveBeenCalledTimes(0);

		wrapper.unmount();
	});

	// describe('positionToValue', () => {
	// 	it('positionToValue should return undefined when there is not state', async () => {
	// 		const onValueChange = jest.fn();

	// 		const wrapper = mount(
	// 			<CircularSlider
	// 				value={0.5}
	// 				onValueChange={onValueChange}
	// 				startAngle={60}
	// 				endAngle={300}
	// 				ThumbComponent={View as any}
	// layout={{
	// 	x: 50,
	// 	y: 50,

	// 	height: 100,
	// 	width: 100,
	// }}
	// 			/>
	// 		);

	// 		const instance = wrapper.instance() as CircularSlider;

	// 		instance.setState({
	// 			layout: undefined as any,
	// 		});

	// 		expect(
	// 			instance.positionToValue({
	// 				moveX: 72,
	// 				moveY: 148,
	// 			} as any)
	// 		).toBeUndefined();

	// 		wrapper.unmount();
	// 	});
	// });
});
