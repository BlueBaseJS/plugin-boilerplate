import 'cross-fetch/polyfill';

import { BlueBaseApp, NavigationContext } from '@bluebase/core';

import Apollo from '@bluebase/plugin-apollo';
import BlueEastClientPluginUI from '@blueeast/client-plugin-ui';
import JsonForm from '@bluebase/plugin-json-schema-components';
import { LoadingState } from '../LoadingState';
import MUIplugin from '@bluebase/plugin-material-ui';
import { MockedProvider } from '@apollo/client/testing';
import { NameSetting } from '../NameSetting';
import Plugin from '../../../index';
import React from 'react';
import { ThingNodeQueryMocks } from '../../../mocks';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('NameSetting', () => {
	it('should show NameSetting', async () => {
		const getParam = (_id: string, _defaultValue: any) => {
			return '123';
		};
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, Apollo, JsonForm, MUIplugin]}>
				<NavigationContext.Provider value={{ getParam } as any}>
					<MockedProvider mocks={[ThingNodeQueryMocks.success]} addTypename={true}>
						<NameSetting thingId="123" />
					</MockedProvider>
				</NavigationContext.Provider>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'Dialog');
		expect(wrapper.find('ListItem').first().prop('description')).toEqual('test-name');
		const onPress: any = wrapper.find('ListItem').first().prop('onPress');
		onPress();
		expect(wrapper.find('Dialog')).toBeDefined();

		wrapper.unmount();
	});

	it('should show SkeletonListItem in the loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueEastClientPluginUI, MUIplugin]}>
				<LoadingState />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'SkeletonListItem');
		expect(wrapper.find('SkeletonListItem').exists()).toBe(true);

		wrapper.unmount();
	});
});
