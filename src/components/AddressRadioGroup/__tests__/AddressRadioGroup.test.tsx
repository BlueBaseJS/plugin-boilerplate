import AddressItem from '../../AddressItem';
import { AddressRadioGroup } from '../AddressRadioGroup';
import { BlueBaseApp } from '@bluebase/core';
import { Noop } from '@bluebase/components';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const addressArray = [
	{
		node: {
			address1: '540 A, Street 4, Zahoor Ilahi Road',
			id: 'id_3',

			city: 'Lahore',
			country: 'Pakistan',
			email: 'commi@blueeast.com',
			name: 'John Doe',
			phone: '+921234567890',
			area: '12535',

			province: 'Punjab',
		}
	},
	{
		node: {
			address1: '540 A, Street 4, Maraka',
			id: 'id_2',

			city: 'Lahore',
			country: 'Pakistan',
			email: 'commi@blueeast.com',
			name: 'Orient',
			phone: '+921234567890',
			area: '12535',

			province: 'Punjab',
		}
	}
];
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('Address Modal', () => {
	it('should render the component and check onPress', async () => {
		const wrapper = mount(
			<BlueBaseApp components={{ ListItem: Noop, Divider: Noop }}>
				<AddressRadioGroup
					value="id_2"
					items={addressArray as any}
					onValueChange={jest.fn()}
					loading={false}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'AddressRadioGroup');
		const onPress: any = wrapper
			.find(AddressItem)
			.first()
			.prop('onPress');

		onPress('ok');
		wrapper.unmount();
	});
	it('should check if renderItems is called when loading is false', async () => {
		const wrapper = mount(
			<BlueBaseApp components={{ ListItem: Noop, Divider: Noop }}>
				<AddressRadioGroup value="id_2" items={addressArray as any}
					loading={false}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'AddressRadioGroup');
		const onPress: any = wrapper
			.find(AddressItem)
			.first()
			.prop('onPress');

		onPress('ok');
		wrapper.unmount();
	});
	it('should check if renderLoadingState is called when loading is true', async () => {
		const wrapper = mount(
			<BlueBaseApp components={{ ListItem: Noop, Divider: Noop }}>
				<AddressRadioGroup value="id_2" items={addressArray as any}
					loading
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'AddressRadioGroup');
		expect(
			wrapper
				.find(AddressRadioGroup)
				.first()
				.prop('value')
		).toBe('id_2');
		wrapper.unmount();
	});
});
