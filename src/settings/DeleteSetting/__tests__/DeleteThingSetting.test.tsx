import 'cross-fetch/polyfill';

import { BlueBaseApp, NavigationContext } from '@bluebase/core';
import { ThingDeleteMutationMocks, ThingNodeQueryMocks } from '../../../mocks';

import BlueBasePluginApollo from '@bluebase/plugin-apollo';
import BlueBasePluginJsonSchemaComponents from '@bluebase/plugin-json-schema-components';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import BlueEastClientPluginUI from '@blueeast/client-plugin-ui';
import { DangerSettingAction } from '../../../imports';
import { DeleteSetting } from '../DeleteSetting';
import MevrisClientPluginUI from '@mevris/client-plugin-ui';
import { MockedProvider } from '@apollo/client/testing';
import Plugin from '../../../index';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const plugins = [
	BlueBasePluginApollo,
	BlueBasePluginJsonSchemaComponents,
	BlueBasePluginMaterialUI,
	BlueEastClientPluginUI,
	MevrisClientPluginUI,
	Plugin,
];

describe('DeleteSetting', () => {
	it('should render component correctly', async () => {
		const navigate = jest.fn();

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<NavigationContext.Provider value={{ navigate } as any}>
					<MockedProvider
						mocks={[ThingDeleteMutationMocks.success, ThingNodeQueryMocks.success]}
						addTypename={true}
					>
						<DeleteSetting thingId="123" />
					</MockedProvider>
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, DangerSettingAction);

		// Find component instance
		const onSuccess: any = wrapper.find(DangerSettingAction).last().prop('onSuccess');

		onSuccess();

		expect(navigate).toHaveBeenCalledTimes(1);
		expect(navigate).toHaveBeenCalledWith('ThingsApp');

		wrapper.unmount();
	});

	it('should check error in getting thing', async () => {
		const navigate = jest.fn();

		const wrapper: any = mount(
			<BlueBaseApp plugins={plugins}>
				<NavigationContext.Provider value={{ navigate } as any}>
					<MockedProvider mocks={[ThingNodeQueryMocks.error]} addTypename={true}>
						<DeleteSetting thingId="123" />
					</MockedProvider>
				</NavigationContext.Provider>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'NetworkError');

		expect(wrapper.find('NetworkError').exists()).toBe(true);
	});
});
