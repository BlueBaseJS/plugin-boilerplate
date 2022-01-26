import 'cross-fetch/polyfill';

import { BlueBaseApp, getComponent } from '@bluebase/core';

import Plugin from '../../../index';
import React from 'react';
import { ShippingMethodListItemProps } from '../ShippingMethodListItem';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const ShippingMethodListItem = getComponent<ShippingMethodListItemProps>(
	'ShippingMethodListItem'
);

const plugins = [Plugin, require('@bluebase/plugin-material-ui')];
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('ShippingMethodListItem', () => {

	it('should return ShippingMethodAvatar if avatar source not given', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<ShippingMethodListItem
					id="123"
					title="Cash"
					price={123}
					estimatedTimeOfDelivery="3 days"
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'ShippingMethodListItem');
		expect(
			wrapper
				.find('ListItem')
				.first()
				.find('BlueBaseImage')
				.last()
				.prop('source')
		).toBe('ShippingMethodPlaceholder');
	});

	it('should render description with currency and price ', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<ShippingMethodListItem
					id="123"
					title="Cash"
					price={123}
					estimatedTimeOfDelivery={undefined as any}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'ShippingMethodListItem');
		expect(
			wrapper
				.find('ListItem')
				.first()
				.prop('description')
		).toBe('Rs. 123');
	});

	it('should render description with estimated delivery time ', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<ShippingMethodListItem
					id="123"
					title="Cash"
					price={undefined as any}
					estimatedTimeOfDelivery="3 days"
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'ShippingMethodListItem');
		expect(
			wrapper
				.find('ListItem')
				.first()
				.prop('description')
		).toBe('3 days');
	});

	it('should render title ', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<ShippingMethodListItem
					id="123"
					title="Cash"
					price={undefined as any}
					estimatedTimeOfDelivery={undefined as any}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'ShippingMethodListItem');
		expect(
			wrapper
				.find('ListItem')
				.first()
				.prop('title')
		).toBe('Cash');
	});

	it('should render loading', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[...plugins, require('@blueeast/client-plugin-ui')]}>
				<ShippingMethodListItem
					id="123"
					title="Cash"
					price={undefined as any}
					estimatedTimeOfDelivery={undefined as any}
					loading
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'ShippingMethodListItem');
		expect(wrapper.find('PlaceholderListItem').exists()).toBe(true);
		wrapper.unmount();
	});
});
