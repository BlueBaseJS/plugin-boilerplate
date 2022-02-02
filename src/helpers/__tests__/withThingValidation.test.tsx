import 'cross-fetch/polyfill';

import { BlueBaseApp, NavigationContext } from '@bluebase/core';

import BlueBasePluginApollo from '@bluebase/plugin-apollo';
import MevrisClientPluginDeviceControllers from '@mevris/client-plugin-device-controllers';
import { MockedProvider } from '@apollo/client/testing';
import Plugin from '../../index';
import React from 'react';
import { Text } from 'react-native';
import { ThingNodeQueryMocks } from '../../mocks';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import { withThingValidation } from '../withThingValidation';

const plugins = [Plugin, MevrisClientPluginDeviceControllers, BlueBasePluginApollo];

const Content = () => <Text>Content</Text>;
const ContentWithValidator = withThingValidation(Content);

describe('withThingValidation', () => {
	it('should not set title param, if it is already set', async () => {
		const navigation: any = {
			getParam: jest.fn().mockImplementation((key) => (key === 'thingId' ? '123' : 'test-name')),
			navigate: jest.fn(),
			setParams: jest.fn(),
		};

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<NavigationContext.Provider value={navigation}>
					<MockedProvider mocks={[ThingNodeQueryMocks.success]} addTypename={true}>
						<ContentWithValidator />
					</MockedProvider>
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Content);

		expect(navigation.setParams).toHaveBeenCalledTimes(0);
	});

	it('should not set title param, if a different one is set', async () => {
		const navigation: any = {
			getParam: jest.fn().mockImplementation((key) => (key === 'thingId' ? '123' : 'foo')),
			navigate: jest.fn(),
			setParams: jest.fn(),
		};

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<NavigationContext.Provider value={navigation}>
					<MockedProvider mocks={[ThingNodeQueryMocks.success]} addTypename={true}>
						<ContentWithValidator />
					</MockedProvider>
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Content);
		expect(wrapper.find('Content > Text').props().children).toContain('Content');
	});

	it('should show error state if there is not thingId set', async () => {
		const navigation: any = {
			getParam: jest.fn().mockImplementation(() => undefined),
			navigate: jest.fn(),
			setParams: jest.fn(),
		};

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<NavigationContext.Provider value={navigation}>
					<MockedProvider mocks={[ThingNodeQueryMocks.success]} addTypename={true}>
						<ContentWithValidator />
					</MockedProvider>
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'NotFoundError');

		expect(wrapper.find('NotFoundError').exists()).toBe(true);
	});
});
