import 'cross-fetch/polyfill';

import { BlueBaseApp } from '@bluebase/core';
import { PaymentMethodListItem } from '../PaymentMethodListItem';
import Plugin from '../../../index';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/jest/MockNativeMethods');

describe('PaymentMethodListItem', () => {

	it('should return PaymentMethodAvatar if avatar source not given', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, require('@bluebase/plugin-material-ui')]}>
				<PaymentMethodListItem id="123" title="Cash" />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'PaymentMethodListItem');
		expect(
			wrapper
				.find('ListItem')
				.first()
				.find('BlueBaseImage')
				.last()
				.prop('source')
		).toBe('PaymentMethodPlaceholder');
	});
	it('should render loading', async () => {
		const wrapper = mount(
			<BlueBaseApp
				plugins={[
					Plugin,
					require('@bluebase/plugin-material-ui'),
					require('@blueeast/client-plugin-ui'),
				]}
			>
				<PaymentMethodListItem id="123" loading title="" />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'PaymentMethodListItem');
		expect(wrapper.find('PlaceholderListItem').exists()).toBe(true);
		wrapper.unmount();
	});
});
