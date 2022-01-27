import { BaseSlider } from '../BaseSlider';
import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import Plugin from '../../../';
import React from 'react';
import { Slider } from '../Slider';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('Slider', () => {
	it('should show label & helperText', async () => {
		const onSlidingStart = jest.fn();

		const wrapper = mount(
			<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
				<Slider
					value={0.5}
					label="Brightness"
					showValue
					helperText="A description here"
					onSlidingStart={onSlidingStart}
					height={20}
					width={100}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Slider);

		expect(wrapper.find('Body1[testID="label"] Text').last().text()).toBe('Brightness');
		expect(wrapper.find('Body1[testID="value"] Text').last().text()).toBe('0.5');
		expect(wrapper.find('Caption Text').last().text()).toBe('A description here');

		wrapper.unmount();
	});

	it('should not show label & helperText', async () => {
		const onSlidingStart = jest.fn();

		const wrapper = mount(
			<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
				<Slider value={0.5} onSlidingStart={onSlidingStart} height={20} width={100} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Slider);

		expect(wrapper.find('[testID="slider-label"]').exists()).toBe(false);
		expect(wrapper.find('[testID="slider-helper-text"]').exists()).toBe(false);

		wrapper.unmount();
	});

	it('should render BaseSlider if layout is provided', async () => {
		const onSlidingStart = jest.fn();

		const wrapper = mount(
			<BlueBaseApp>
				<Slider
					vertical
					value={0.5}
					label="Brightness"
					showValue
					helperText="A description here"
					onSlidingStart={onSlidingStart}
					height={20}
					width={100}
					layout={{ x: 0, y: 0, width: 100, height: 25 }}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, BaseSlider);

		expect(wrapper.find(BaseSlider).exists()).toBe(true);

		wrapper.unmount();
	});
});
