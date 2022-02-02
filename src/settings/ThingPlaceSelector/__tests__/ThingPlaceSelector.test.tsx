import 'cross-fetch/polyfill';

import {
	PlaceQueryEmptyMocks,
	PlaceQueryMocks,
	ThingPlaceQueryMocks,
	ThingPlaceUpdateMutationMocks,
} from '../../../mocks';

import Apollo from '@bluebase/plugin-apollo';
import { BlueBaseApp } from '@bluebase/core';
import BlueEastClientPluginUI from '@blueeast/client-plugin-ui';
import ClientPluginUI from '@mevris/client-plugin-ui';
import JsonForm from '@bluebase/plugin-json-schema-components';
import { LoadingState } from '../LoadingState';
import MUIplugin from '@bluebase/plugin-material-ui';
import { MockedProvider } from '@apollo/client/testing';
import { Noop } from '@bluebase/components';
import Plugin from '../../../index';
import React from 'react';
import { ThingPlaceSelector } from '../ThingPlaceSelector';
import { mount } from 'enzyme';
import wait from 'waait';
import { waitForElement } from 'enzyme-async-helpers';

describe('ThingPlaceSelector', () => {
	it('should show ThingPlaceSelector', async () => {
		const wrapper = mount(
			<BlueBaseApp
				plugins={[Plugin, MUIplugin, Apollo, JsonForm, ClientPluginUI]}
				components={{ GraphqlList: Noop }}
			>
				<MockedProvider
					mocks={[
						PlaceQueryMocks.success,
						ThingPlaceQueryMocks.success,
						ThingPlaceUpdateMutationMocks.success,
					]}
					addTypename={false}
				>
					<ThingPlaceSelector thingId="123" />
				</MockedProvider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Dialog');

		expect(wrapper.find('Dialog').first().prop('visible')).toBe(false);

		expect(wrapper.find('ListItem').first().prop('description')).toBe('test-place-name');

		const openList: any = wrapper.find('ListItem').first().prop('onPress');

		openList();

		await waitForElement(wrapper, 'PlaceList');

		expect(wrapper.find('Dialog').first().prop('visible')).toBe(false);

		const updatePlace: any = wrapper.find('PlaceList').first().prop('onPress');

		wrapper.update();

		await updatePlace('test-place-id-2');
		await wait(1500);
		wrapper.update();

		expect(wrapper.find('Dialog').first().prop('visible')).toBe(false);

		wrapper.find('ActivityIndicator');
	});
	it('should show ThingPlaceSelector with empty place', async () => {
		jest.mock('react-native/Libraries/Utilities/Platform', () => {
			const Platform = jest.requireActual('react-native/Libraries/Utilities/Platform');
			Platform.OS = 'mobile';
			return Platform;
		});
		const wrapper = mount(
			<BlueBaseApp
				plugins={[Plugin, MUIplugin, Apollo, JsonForm, ClientPluginUI]}
				components={{ GraphqlList: Noop }}
			>
				<MockedProvider
					mocks={[
						PlaceQueryEmptyMocks.success,
						ThingPlaceQueryMocks.success,
						ThingPlaceUpdateMutationMocks.success,
					]}
					addTypename={false}
				>
					<ThingPlaceSelector thingId="123" picker />
				</MockedProvider>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'Dialog');

		expect(wrapper.find('Dialog').first().prop('visible')).toBe(false);
		const openList: any = wrapper.find('ListItem').first().prop('onPress');

		openList();
	});
	it('should show ThingPlaceSelector with picker', async () => {
		mount(
			<BlueBaseApp
				plugins={[Plugin, MUIplugin, Apollo, JsonForm, ClientPluginUI]}
				components={{ GraphqlList: Noop }}
			>
				<MockedProvider
					mocks={[
						PlaceQueryMocks.success,
						ThingPlaceQueryMocks.success,
						ThingPlaceUpdateMutationMocks.success,
					]}
					addTypename={false}
				>
					<ThingPlaceSelector thingId="123" picker />
				</MockedProvider>
			</BlueBaseApp>
		);
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
