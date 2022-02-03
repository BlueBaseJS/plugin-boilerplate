import { KelvinCircularSlider } from '../KelvinCircularSlider';
import React from 'react';
import { mount } from 'enzyme';

describe('KelvinCircularSlider', () => {
	it('should show 7 segments', async () => {
		const onSlidingStart = jest.fn();

		const wrapper = mount(
			<KelvinCircularSlider
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

		expect(
			wrapper.find(KelvinCircularSlider).find('ColorTrack').find('LinearGradient').length
		).toBe(7);

		expect(wrapper.find(KelvinCircularSlider).find('ColorTrack').find('Path').length).toBe(7);

		wrapper.unmount();
	});
});
