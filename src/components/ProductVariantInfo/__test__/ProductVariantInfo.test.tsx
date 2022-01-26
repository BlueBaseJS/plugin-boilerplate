import { BlueBaseApp } from '@bluebase/core';
import { Linking } from 'react-native';
import Plugin from '../../../index';
import { ProductVariantInfo } from '..';
import React from 'react';
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

describe('ProductVariantInfo', () => {
	it('should check if variants are showing without variant array', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, require('@bluebase/plugin-material-ui')]}>
				<ProductVariantInfo
					title="Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip "
					url="https://www.google.com"
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'ProductVariantInfo');
		expect(wrapper.find('View[testID="variantsView"]').exists()).toBe(false);
		wrapper.unmount();
	});
	it('should open url upon item click', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, require('@bluebase/plugin-material-ui')]}>
				<ProductVariantInfo
					title="Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip "
					url="https://www.google.com"
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'ProductVariantInfo');

		const textClick: any = wrapper
			.find('Text[testID="ClickMe"]')
			.last()
			.prop('onPress');
		textClick();

		expect(Linking.openURL).toBeCalled();
		expect(Linking.openURL).toBeCalledTimes(1);
		wrapper.unmount();
	});

	it('should render title as text', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, require('@bluebase/plugin-material-ui')]}>
				<ProductVariantInfo
					title="Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip"
					url="https://www.google.com"
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'ProductVariantInfo');
		expect(
			wrapper
				.find('Body1[testID="ClickMe"]')
				.last()
				.find('Text')
				.last()
				.text()
		).toBe('Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip');
		wrapper.unmount();
	});

	it('should open url on touchable item click', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, require('@bluebase/plugin-material-ui')]}>
				<ProductVariantInfo
					title="Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip"
					url="https://www.google.com"
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'ProductVariantInfo');
		const pressList: any = wrapper
			.find('ListItem')
			.first()
			.prop('onPress');
		pressList();
		expect(Linking.openURL).toBeCalled();
		expect(Linking.openURL).toBeCalledWith('https://www.google.com');
		expect(
			wrapper
				.find('ListItem')
				.first()
				.prop('description')
		).toBe(false);
		wrapper.unmount();
	});

	it('should check if variants are showing with variant array', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, require('@bluebase/plugin-material-ui')]}>
				<ProductVariantInfo
					title="Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip"
					url="https://www.google.com"
					variants={[
						{ name: 'color', value: 'Red' },
						{ name: 'size', value: 'large' },
					]}
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'ProductVariantInfo');
		expect(
			wrapper
				.find('Body2[testID="variant-name"]')
				.last()
				.find('Text')
				.last()
				.text()
		).toBe('size: ');
		expect(
			wrapper
				.find('Body2[testID="variant-value"]')
				.last()
				.find('Text')
				.last()
				.text()
		).toBe('large');
		wrapper.unmount();
	});
	it('should check if skeleton is rendered when loading is true', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, require('@bluebase/plugin-material-ui')]}>
				<ProductVariantInfo
					title="Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip"
					url="https://www.google.com"
					variants={[{ name: 'color', value: 'Red' }]}
					loading
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'ProductVariantInfo');
		wrapper.unmount();
	});
	it('should check if variants are showing with variant array', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, require('@bluebase/plugin-material-ui')]}>
				<ProductVariantInfo
					title="Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip"
					url="https://www.google.com"
					variants={[
						{ name: 'color', value: 'Red' },
						{ name: 'size', value: 'large' },
					]}
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'ProductVariantInfo');
		expect(
			wrapper
				.find('Body2[testID="variant-name"]')
				.last()
				.find('Text')
				.last()
				.text()
		).toBe('size: ');
		expect(
			wrapper
				.find('Body2[testID="variant-value"]')
				.last()
				.find('Text')
				.last()
				.text()
		).toBe('large');
		wrapper.unmount();
	});
});
