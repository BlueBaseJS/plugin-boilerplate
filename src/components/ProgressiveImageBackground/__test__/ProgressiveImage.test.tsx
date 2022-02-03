const mockGetDimensions = jest.fn().mockReturnValue({
	height: 800,
	width: 300,
});

jest.mock('react-native/Libraries/Utilities/Dimensions', () => {
	const DimentsionsActual = jest.requireActual('react-native/Libraries/Utilities/Dimensions');
	jest.mock('@blueeast/client-plugin-ui/dist/components/Alert/useAlert', () => ({
		useAlert: () => ({ alert: jest.fn() }),
	}));

	return class extends DimentsionsActual {
		static get: jest.Mock = mockGetDimensions;
	};
});

import { BlueBaseApp, getComponent } from '@bluebase/core';

import { Animated } from 'react-native';
import MUIplugin from '@bluebase/plugin-material-ui';
import Plugin from '../../../index';
import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { waitForElement } from 'enzyme-async-helpers';

/**
 * Mocking expo Library
 */

jest.mock('expo', () => ({}));

const ProgressiveImageBackground = getComponent('ProgressiveImageBackground');
const Text = getComponent('Text');
const Button = getComponent('Button');

describe('ProgressiveImageBackground', () => {
	it('should render ProgressiveImage without crashing', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<BlueBaseApp plugins={[Plugin, MUIplugin]}>
					<ProgressiveImageBackground />
				</BlueBaseApp>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, ProgressiveImageBackground);

		expect(wrapper.find(ProgressiveImageBackground).exists()).toBeTruthy();
	});

	it('should render ProgressiveImageBackground with child', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<ProgressiveImageBackground
					thumbnail={{ uri: '' }}
					source="test-Source"
					placeholder="test-placeholder"
					style={{ height: 200, width: 200 }}
					blurRadius={8}
				>
					<Text testID="progressiveText">Hello World</Text>
				</ProgressiveImageBackground>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, ProgressiveImageBackground);
		// expect(wrapper).toMatchSnapshot();

		// Simulate onLoad for thumbnail
		const onThumbnailLoad: any = wrapper
			.find('AnimatedComponent[testID="thumbnail-animated-image"]')
			.first()
			.prop('onLoad');

		// calling onThumbnailLoad()
		onThumbnailLoad();

		// Simulate onLoad for thumbnail
		const onLoadEnd: any = wrapper.find('AnimatedComponent').last().prop('onLoadEnd');

		// calling onThumbnailLoad()
		onLoadEnd();
		// Simulate onLoad for thumbnail
		const onImageLoad: any = await wrapper.find('AnimatedComponent').last().prop('onLoad');

		// calling onThumbnailLoad()
		onImageLoad();

		// expect
		expect(wrapper.find('ProgressiveImageBackground').last().prop('source')).toEqual('test-Source');
		expect(wrapper.find('ProgressiveImageBackground').last().prop('thumbnail')).toMatchObject({
			uri: '',
		});
		expect(wrapper.find('ProgressiveImageBackground').last().prop('blurRadius')).toEqual(8);

		const text: string = wrapper.find('Text [testID="progressiveText"]').first().text();
		expect(text).toBe('Hello World');

		//
		wrapper.unmount();
	});

	it('should render ProgressiveImageBackground in desktop mode with Button', async () => {
		mockGetDimensions.mockReturnValue({
			height: 1200,
			width: 1200,
		});
		const button = jest.fn();
		const wrapper: any = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<ProgressiveImageBackground
					thumbnail={{ uri: '' }}
					source="test-Source"
					placeholder="test-placeholder"
					style={{ height: 200, width: 200 }}
					blurRadius={8}
				>
					<Button testID="progressiveButton" title="Click Me!" onPress={button} />
				</ProgressiveImageBackground>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, ProgressiveImageBackground);
		// expect(wrapper).toMatchSnapshot();

		// Simulate onLoad for thumbnail
		const onThumbnailLoad: any = wrapper
			.find('AnimatedComponent[testID="thumbnail-animated-image"]')
			.first()
			.prop('onLoad');

		// calling onThumbnailLoad()
		onThumbnailLoad();

		// Simulate onLoad for thumbnail
		const onLoadEnd: any = wrapper.find('AnimatedComponent').last().prop('onLoadEnd');

		// calling onThumbnailLoad()
		onLoadEnd();
		// Simulate onLoad for thumbnail
		const onImageLoad: any = await wrapper.find('AnimatedComponent').last().prop('onLoad');

		// calling onThumbnailLoad()
		onImageLoad();

		// expect
		expect(wrapper.find('ProgressiveImageBackground').last().prop('source')).toEqual('test-Source');
		const onPress: any = wrapper
			.find('Button [testID="progressiveButton"]')
			.first()
			.prop('onPress');
		onPress();
		expect(button).toHaveBeenCalledTimes(1);
		wrapper.unmount();
	});

	it('should not animate main image if image is loaded within 500 ms', async () => {
		jest.spyOn(Animated, 'timing');
		const AnimatedTiming = Animated.timing as jest.Mock<any>;

		const button = jest.fn();
		const wrapper: any = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<ProgressiveImageBackground
					thumbnail={{ uri: '' }}
					source="test-Source"
					placeholder="test-placeholder"
					style={{ height: 200, width: 200 }}
					blurRadius={8}
				>
					<Button testID="progressiveButton" title="Click Me!" onPress={button} />
				</ProgressiveImageBackground>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, '[testID="progressive-image-main"]');

		AnimatedTiming.mockClear();

		// Initial thumbnail animations
		expect(AnimatedTiming).toHaveBeenCalledTimes(0);

		// Simulate onLoad for thumbnail
		const onLoad: any = wrapper
			.find('AnimatedComponent[testID="progressive-image-main"]')
			.first()
			.prop('onLoad');

		onLoad();

		// debugger;
		expect(AnimatedTiming.mock.calls[0][1].duration).toBe(0);

		wrapper.unmount();
	});

	it('should animate main image if image is takes more than 500 ms to load', async () => {
		jest.spyOn(Animated, 'timing');
		const AnimatedTiming = Animated.timing as jest.Mock<any>;

		const button = jest.fn();
		const wrapper: any = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<ProgressiveImageBackground
					thumbnail={{ uri: '' }}
					source="test-Source"
					placeholder="test-placeholder"
					style={{ height: 200, width: 200 }}
					blurRadius={8}
				>
					<Button testID="progressiveButton" title="Click Me!" onPress={button} />
				</ProgressiveImageBackground>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, '[testID="progressive-image-main"]');

		AnimatedTiming.mockClear();

		// Initial thumbnail animations
		expect(AnimatedTiming).toHaveBeenCalledTimes(0);

		// Simulate onLoad start for thumbnail
		const onLoadStart: any = wrapper
			.find('AnimatedComponent[testID="progressive-image-main"]')
			.first()
			.prop('onLoadStart');

		onLoadStart();

		await wait(700);

		// Simulate onLoad for thumbnail
		const onLoad: any = wrapper
			.find('AnimatedComponent[testID="progressive-image-main"]')
			.first()
			.prop('onLoad');

		onLoad();

		// debugger;
		expect(AnimatedTiming.mock.calls[0][1].duration).toBe(500);

		wrapper.unmount();
	});
});
