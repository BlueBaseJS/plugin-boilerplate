import { HueCircularSlider } from '../HueCircularSlider';
import React from 'react';
import { mount } from 'enzyme';

describe('HueCircularSlider', () => {
	it('should show 6 segments', async () => {
		const onSlidingStart = jest.fn();

		const wrapper = mount(
			<HueCircularSlider
				onSlidingStart={onSlidingStart}
				startAngle={60}
				endAngle={300}
				layout={{
					x: 0,
					y: 0,

					height: 200,
					width: 200,
				}}
			/>
		);

		expect(wrapper.find(HueCircularSlider).find('ColorTrack').find('LinearGradient').length).toBe(
			6
		);

		expect(wrapper.find(HueCircularSlider).find('ColorTrack').find('Path').length).toBe(6);

		wrapper.unmount();
	});
});
