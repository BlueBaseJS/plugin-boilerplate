import { BlueBaseApp, isMobile } from '@bluebase/core';

import { Animated } from 'react-native';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import Plugin from '../../../index';
import React from 'react';
import { SlidingPane } from '../SlidingPane';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('react-native/Libraries/Animated/src/Animated', () => {
	return {
		createAnimatedComponent: jest.fn(),
		timing: jest.fn().mockReturnValue({ start: jest.fn() }),
		Value: class Value {
			render() {
				return ';';
			}
		},
		View: () => 'View',
	};
});
jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

describe('Sliding Pane', () => {
	beforeEach(() => {
		jest.mock('@bluebase/core/dist/utils/Screen', () => ({
			isMobile: jest.fn().mockReturnValue(true),
		}));
	});
	it('Should render sliding pane successfullyn on mobile', async () => {
		(Animated.timing as jest.Mock).mockReset();
		(Animated.timing as jest.Mock).mockReturnValue({ start: jest.fn() });
		(isMobile as jest.Mock).mockReturnValue(true);

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI]}>
				<SlidingPane />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, SlidingPane);
		const ins: any = wrapper.find('SlidingPane').last().instance();

		expect(Animated.timing).toHaveBeenCalledTimes(0);

		ins.slideRight();

		const lastCall = (Animated.timing as jest.Mock).mock.calls[0];

		expect(Animated.timing).toHaveBeenCalledTimes(1);
		expect(lastCall[0]._value).toBe(undefined);
		expect(lastCall[1]).toMatchObject({ duration: 150, toValue: 750 });
	});
	it('Should render sliding pane successfully', async () => {
		(Animated.timing as jest.Mock).mockReset();
		(Animated.timing as jest.Mock).mockReturnValue({ start: jest.fn() });
		(isMobile as jest.Mock).mockReturnValue(false);

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI]}>
				<SlidingPane />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, SlidingPane);
		const ins: any = wrapper.find('SlidingPane').last().instance();

		expect(Animated.timing).toHaveBeenCalledTimes(0);

		ins.slideRight();

		const lastCall = (Animated.timing as jest.Mock).mock.calls[0];

		expect(Animated.timing).toHaveBeenCalledTimes(1);
		expect(lastCall[0]._value).toBe(undefined);
		expect(lastCall[1]).toMatchObject({ duration: 150, toValue: 750 });
	});

	it('Should render sliding pane successfully  while sliding left animation', async () => {
		(Animated.timing as jest.Mock).mockReset();
		(Animated.timing as jest.Mock).mockReturnValue({ start: jest.fn() });
		(isMobile as jest.Mock).mockReturnValue(false);

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI]}>
				<SlidingPane />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, SlidingPane);
		const ins: any = wrapper.find('SlidingPane').last().instance();

		expect(Animated.timing).toHaveBeenCalledTimes(0);

		ins.slideLeft();

		const lastCall = (Animated.timing as jest.Mock).mock.calls[0];

		expect(Animated.timing).toHaveBeenCalledTimes(1);
		expect(lastCall[1]).toMatchObject({ duration: 150, toValue: -750 });
	});

	it('Should render sliding pane successfully while sliding center', async () => {
		(Animated.timing as jest.Mock).mockReset();
		(Animated.timing as jest.Mock).mockReturnValue({ start: jest.fn() });
		(isMobile as jest.Mock).mockReturnValue(false);

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI]}>
				<SlidingPane />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, SlidingPane);
		const ins: any = wrapper.find('SlidingPane').last().instance();

		expect(Animated.timing).toHaveBeenCalledTimes(0);

		ins.slideCenter();

		const lastCall = (Animated.timing as jest.Mock).mock.calls[0];
		expect(Animated.timing).toHaveBeenCalledTimes(1);
		expect(lastCall[1]).toMatchObject({ duration: 150, toValue: 0 });
	});

	it('Should render sliding pane successfully while sliding center', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI]}>
				<SlidingPane />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, SlidingPane);
		const ins: any = wrapper.find('SlidingPane').last().instance();

		expect(ins.state.leftAnim._value).toBe(undefined);
	});
});
