import 'cross-fetch/polyfill';

import { BlueBaseApp, NavigationContext, merge } from '@bluebase/core';

import Apollo from '@bluebase/plugin-apollo';
import JsonForm from '@bluebase/plugin-json-schema-components';
import { List } from '@bluebase/components';
import MUIplugin from '@bluebase/plugin-material-ui';
import { MockedProvider } from '@apollo/client/testing';
import Plugin from '../../../index';
import { ProductInfoSetting } from '../ProductInfoSetting';
import React from 'react';
import { ThingProductQueryMocks } from '../../../mocks';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ProductInfoSetting', () => {
	it('should show ProductInfoSetting', async () => {
		const getParam = jest.fn().mockReturnValue('123');

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, Apollo, JsonForm, MUIplugin]}>
				<NavigationContext.Provider value={{ getParam } as any}>
					<MockedProvider mocks={[ThingProductQueryMocks.success]} addTypename={true}>
						<ProductInfoSetting thingId="123" />
					</MockedProvider>
				</NavigationContext.Provider>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, List.Item);
		expect(wrapper.find(List.Item).first().prop('title')).toEqual('Orient Ultron Super');
	});

	it('should show empty state if there is no product', async () => {
		const getParam = jest.fn().mockReturnValue('123');

		const success = merge(ThingProductQueryMocks.success, {
			result: {
				data: {
					node: {
						product: null,
					},
				},
			},
		} as any);

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, Apollo, JsonForm, MUIplugin]}>
				<NavigationContext.Provider value={{ getParam } as any}>
					<MockedProvider mocks={[success]} addTypename={true}>
						<ProductInfoSetting thingId="123" />
					</MockedProvider>
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		// await waitForElement(wrapper, 'ProductInfoLoadingState');
		// expect(wrapper.find('ProductInfoLoadingState').exists()).toBe(true);

		await waitForElement(wrapper, 'ProductInfoEmptyState');
		expect(wrapper.find('ProductInfoEmptyState Body2 Text').last().text()).toEqual(
			'This thing has no product assosiated with it.'
		);
	});
});
