import 'cross-fetch/polyfill';

import Apollo from '@bluebase/plugin-apollo';
import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginResponsiveGrid from '@bluebase/plugin-responsive-grid';
import BlueEastClientPluginUI from '@blueeast/client-plugin-ui';
import MUI from '@bluebase/plugin-material-ui';
import { MockedProvider } from '@apollo/client/testing';
import PLuginUi from '@mevris/client-plugin-ui';
import PermissionUI from '@blueeast/client-plugin-permissions-ui';
import Plugin from '../../../index';
import React from 'react';
import { ThingNodeQueryMocks } from '../../../graphql/mocks';
import { ThingsAvatarSettings } from '../';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const { success } = ThingNodeQueryMocks;
jest.mock('expo', () => {});
jest.mock('expo-location', () => ({ getCurrentPositionAsync: jest.fn() }));

describe('Avatar Setting', () => {
	it('Avatar Setting', async () => {
		// mount component

		const wrapper = mount(
			<BlueBaseApp
				plugins={[
					Plugin,
					MUI,
					Apollo,
					BlueBasePluginResponsiveGrid,
					PLuginUi,
					PermissionUI,
					BlueEastClientPluginUI,
				]}
			>
				<MockedProvider mocks={[success]} addTypename={true}>
					<ThingsAvatarSettings thingId="123" />
				</MockedProvider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ThingsAvatarSettings);
		expect(wrapper.html()).toMatchSnapshot(); // 1st snapshot
		wrapper.setProps({ orderDetail: { source: false } });
		// check your snapshot with new props :)
		expect(wrapper.html()).toMatchSnapshot(); // 2nd snapshot
		const LoadingComponent: any = wrapper
			.find('StatefulComponent')
			.first()
			.prop('loadingComponent');
		LoadingComponent();
		wrapper.unmount();
	});
});
