import 'cross-fetch/polyfill';

import { BlueBaseApp, NavigationContext, merge } from '@bluebase/core';

import Apollo from '@bluebase/plugin-apollo';
import JsonForm from '@bluebase/plugin-json-schema-components';
import MUIplugin from '@bluebase/plugin-material-ui';
import { MockedProvider } from '@apollo/client/testing';
import Plugin from '../../../index';
import { ProductDetailSetting } from '../ProductDetailSetting';
import { ProductInfoEmptyState } from '../EmptyState';
import React from 'react';
import { ThingProductQueryMocks } from '../../../mocks';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ProductDetailSetting', () => {
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
						<ProductDetailSetting thingId="123" />
					</MockedProvider>
				</NavigationContext.Provider>
			</BlueBaseApp>
		);
		const wrap = mount(
			<BlueBaseApp plugins={[Plugin, Apollo, JsonForm, MUIplugin]}>
				<ProductInfoEmptyState />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, ProductDetailSetting);

		await waitForElement(wrap, ProductInfoEmptyState);
		expect(wrap.find('ProductInfoEmptyState Body2 Text').last().text()).toEqual(
			'This thing has no product assosiated with it.'
		);
	});
});
