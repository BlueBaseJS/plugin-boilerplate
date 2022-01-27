import { BlueBaseApp } from '@bluebase/core';
import { Linking } from 'react-native';
import Plugin from '../../../index';
import React from 'react';
import { StoreInfo } from '../StoreInfo';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('react-native/Libraries/Linking/Linking', () => {
	return {
		addEventListener: jest.fn(),
		openURL: jest.fn(),
		removeEventListener: jest.fn(),
	};
});
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/jest/MockNativeMethods');

describe('StoreInfo', () => {
	it('should render avatar correctly', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, require('@bluebase/plugin-material-ui')]}>
				<StoreInfo
					title="Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip "
					url="https://www.google.com"
					avatar="Dummy"
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, StoreInfo);
		expect(
			wrapper
				.find('ListItem')
				.first()
				.find('ListAvatar')
				.last()
				.prop('image')
		).toMatchObject({ uri: 'Dummy' });
		wrapper.unmount();
	});
	it('should render title as text ', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, require('@bluebase/plugin-material-ui')]}>
				<StoreInfo
					title="Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip "
					url="https://www.google.com"
					avatar="Dummy"
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'ListItem');
		expect(
			wrapper
				.find('ListItem')
				.first()
				.prop('title')
		).toBe('Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip ');
		wrapper.unmount();
	});
	it('should render skeleton when loading is true ', async () => {
		const wrapper = mount(
			<BlueBaseApp
				plugins={[
					Plugin,
					require('@bluebase/plugin-material-ui'),
					require('@blueeast/client-plugin-ui'),
				]}
			>
				<StoreInfo
					title="Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip "
					url="https://www.google.com"
					avatar="Dummy"
					loading
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'PlaceholderListItem');
		wrapper.unmount();
	});
});

describe('StoreInfo', () => {
	it('should open correct url upon item click', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, require('@bluebase/plugin-material-ui')]}>
				<StoreInfo
					title="Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip "
					url="https://www.google.com"
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'StoreInfo');
		const textClick: any = wrapper
			.find('Text[testID="ClickMe"]')
			.last()
			.prop('onPress');
		textClick();

		expect(Linking.openURL).toBeCalled();
		expect(Linking.openURL).toBeCalledTimes(1);
		expect(Linking.openURL).toBeCalledWith('https://www.google.com');
		wrapper.unmount();
	});
});
