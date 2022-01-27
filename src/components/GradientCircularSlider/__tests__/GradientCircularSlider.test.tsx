import { ColorTrack } from '../ColorTrack';
import { GradientCircularSlider } from '../GradientCircularSlider';
import React from 'react';
import { mount } from 'enzyme';

describe('GradientCircularSlider', () => {
	it('should show 6 segments', async () => {
		const onSlidingStart = jest.fn();

		const wrapper = mount(
			<GradientCircularSlider
				onSlidingStart={onSlidingStart}
				startAngle={60}
				endAngle={300}
				colors={['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#f00']}
				layout={{
					x: 0,
					y: 0,

					height: 200,
					width: 200,
				}}
			/>
		);

		expect(
			wrapper.find(GradientCircularSlider).find(ColorTrack).find('LinearGradient').length
		).toBe(6);

		expect(wrapper.find(GradientCircularSlider).find(ColorTrack).find('Path').length).toBe(6);

		wrapper.unmount();
	});

	it('should show 7 segments', async () => {
		const onSlidingStart = jest.fn();

		const wrapper = mount(
			<GradientCircularSlider
				onSlidingStart={onSlidingStart}
				startAngle={60}
				endAngle={300}
				colors={[
					'rgb(255,106,0)',
					'rgb(255,159,65)',
					'rgb(255,191,131)',
					'rgb(255,214,177)',
					'rgb(255,232,214)',
					'rgb(255,245,244)',
					'rgb(241,241,255)',
					'rgb(224,231,255)',
				]}
				layout={{
					x: 0,
					y: 0,

					height: 200,
					width: 200,
				}}
			/>
		);

		expect(
			wrapper.find(GradientCircularSlider).find(ColorTrack).find('LinearGradient').length
		).toBe(7);

		expect(wrapper.find(GradientCircularSlider).find(ColorTrack).find('Path').length).toBe(7);

		wrapper.unmount();
	});
});
