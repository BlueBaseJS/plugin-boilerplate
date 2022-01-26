import 'cross-fetch/polyfill';

import { BlueBaseApp, isMobile } from '@bluebase/core';

import Apollo from '@bluebase/plugin-apollo';
import BlueEastClientPluginUI from '@blueeast/client-plugin-ui';
import MUIplugin from '@bluebase/plugin-material-ui';
import { MockedProvider } from '@apollo/react-testing';
import { Noop } from '@bluebase/components';
import { PaymentMethodListQueryMocks } from '../../../graphql/mocks';
import { PaymentMethodPicker } from '../PaymentMethodPicker';
import { PlaceholderListItem } from '../../../imports';
import Plugin from '../../../index';
import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

describe('PaymentMethodPicker', () => {
	it('should show PaymentMethodPicker', async () => {
		(isMobile as jest.Mock).mockReturnValue(true);
		const onValueChange = jest.fn();

		const wrapper = mount(
			<BlueBaseApp
				plugins={[Plugin, MUIplugin, Apollo]}
				components={{ GraphqlList: Noop }}
			>
				<MockedProvider mocks={PaymentMethodListQueryMocks.success()} addTypename={false}>
					<PaymentMethodPicker title="BlueEast" avatar="source" onValueChange={onValueChange} />
				</MockedProvider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Dialog');

		expect(
			wrapper
				.find('Dialog')
				.first()
				.prop('visible')
		).toBe(false);

		expect(
			wrapper
				.find('ListItem')
				.first()
				.prop('description')
		).toBe('BlueEast');

		const openList: any = wrapper
			.find('ListItem')
			.first()
			.prop('onPress');

		openList();

		await waitForElement(wrapper, 'PaymentMethodList');

		expect(
			wrapper
				.find('Dialog')
				.first()
				.prop('visible')
		).toBe(true);

		const updatePaymentMethod: any = wrapper
			.find('PaymentMethodList')
			.first()
			.prop('onPress');

		wrapper.update();

		await updatePaymentMethod({ title: 'New PaymentMethod' });
		await wait(1500);
		wrapper.update();

		expect(onValueChange).toHaveBeenCalledTimes(1);
		expect(onValueChange).toHaveBeenCalledWith({ title: 'New PaymentMethod' });
	});

	it('should not call onValueChange if it is not provided in prop', async () => {
		const onValueChange = jest.fn();

		const wrapper = mount(
			<BlueBaseApp
				plugins={[Plugin, MUIplugin, Apollo]}
				components={{ GraphqlList: Noop }}
			>
				<MockedProvider mocks={PaymentMethodListQueryMocks.success()} addTypename={false}>
					<PaymentMethodPicker title="BlueEast" avatar="source" />
				</MockedProvider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Dialog');

		const openList: any = wrapper
			.find('ListItem')
			.first()
			.prop('onPress');

		openList();

		await waitForElement(wrapper, 'PaymentMethodList');

		const updatePaymentMethod: any = wrapper
			.find('PaymentMethodList')
			.first()
			.prop('onPress');

		wrapper.update();

		await updatePaymentMethod({ title: 'New PaymentMethod' });
		await wait(1500);
		wrapper.update();

		expect(onValueChange).toHaveBeenCalledTimes(0);
	});

	it('should show SkeletonListItem in the loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueEastClientPluginUI, MUIplugin]}>
				<PaymentMethodPicker loading />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, PlaceholderListItem);
		expect(wrapper.find(PlaceholderListItem).exists()).toBe(true);

		wrapper.unmount();
	});

	it('should show ActivityIndicator in the mutating state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueEastClientPluginUI, MUIplugin]}>
				<PaymentMethodPicker mutating />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'ActivityIndicator');
		expect(wrapper.find('ActivityIndicator').exists()).toBe(true);

		wrapper.unmount();
	});
});
