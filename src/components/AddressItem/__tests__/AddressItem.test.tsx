import { AddressItem as Address } from '..';
import { AddressItem } from '../AddressItem';
import { BlueBaseApp } from '@bluebase/core';
import { Noop } from '@bluebase/components';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/jest/MockNativeMethods');

describe('AddressItem', () => {
	it('should render email and phone when provided', async () => {
		const wrapper = mount(
			<BlueBaseApp components={{ ListItem: Noop }}>
				<Address
					name="test"
					address1="test-address"
					city="Lahore"
					country="Pakistan"
					phone="0123456"
					email="123@abc.com"
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, AddressItem);

		expect(
			wrapper
				.find('ListItem')
				.exists()
		).toBe(true);

		wrapper.unmount();
	});
	it('should render email and phone when provided', async () => {
		const wrapper = mount(
			<BlueBaseApp components={{ ListItem: Noop }}>
				<Address />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, AddressItem);

		expect(
			wrapper
				.find('ListItem')
				.exists()
		).toBe(true);

		wrapper.unmount();
	});

	it('should render skeleton when component is loading', async () => {
		const wrapper = mount(
			<BlueBaseApp components={{ ListItem: Noop }}>
				<Address loading />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, AddressItem);

		expect(wrapper.find('PlaceholderListItem').exists());
		wrapper.unmount();
	});

});
