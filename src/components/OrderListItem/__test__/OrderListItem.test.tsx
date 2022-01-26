import 'cross-fetch/polyfill';

import { BlueBaseApp } from '@bluebase/core';
import { Noop } from '@bluebase/components';
import { OrderListItem } from '../OrderListItem';
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

describe('OrderListItem', () => {
	it('should check if title is rendered as text', async () => {
		const wrapper = mount(
			<BlueBaseApp components={{ ListItem: Noop }}>
				<OrderListItem
					name="test"
					orderName="test-order"
					totalPrice={123}
					quantity={1}
					avatar="dummy"
					styles={{}}
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'OrderListItem');
		expect(
			wrapper
				.find('ListItem')
				.first()
				.prop('title')
		).toBe('test x 1');
		wrapper.unmount();
	});
	it('should check if placeholder is placed if avatar is not available', async () => {
		const wrapper = mount(
			<BlueBaseApp components={{ ListItem: Noop }}>
				<OrderListItem
					name="test"
					orderName="test-order"
					quantity={1}
					loading
					status={{
						backgroundColor: '#c8e6c9',
						color: '#4caf50',
						description: 'status',
						id: '1',
						title: 'Confirmed',
					}}
					createdAt={new Date().toISOString()}
					styles={{}}
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'OrderListItem');
		wrapper.unmount();
	});
	it('should check if placeholder is placed if avatar is not available', async () => {
		const wrapper = mount(
			<BlueBaseApp components={{ ListItem: Noop }}>
				<OrderListItem
					name="test"
					orderName="test-order"
					quantity={1}
					status={{
						backgroundColor: '#c8e6c9',
						color: '#4caf50',
						description: 'status',
						id: '1',
						title: 'Confirmed',
					}}
					createdAt={new Date().toISOString()}
					loading
					styles={{}}
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'OrderListItem');
		wrapper.unmount();
	});
});
