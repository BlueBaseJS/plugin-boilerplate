import 'cross-fetch/polyfill';

import { BlueBaseApp, NavigationContext } from '@bluebase/core';

import BlueBasePluginApollo from '@bluebase/plugin-apollo';
import BlueBasePluginJsonSchemaComponents from '@bluebase/plugin-json-schema-components';
import BlueBasePluginMaterialUi from '@bluebase/plugin-material-ui';
import MevrisPluginDeviceControllers from '@mevris/client-plugin-device-controllers';
import MevrisPluginUI from '@mevris/client-plugin-ui';
import { MockedProvider } from '@apollo/client/testing';
import Plugin from '../../..';
import React from 'react';
import { ThingWifiSettings } from '../ThingWifiSettings';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const plugins = [
	BlueBasePluginApollo,
	BlueBasePluginJsonSchemaComponents,
	BlueBasePluginMaterialUi,
	MevrisPluginDeviceControllers,
	MevrisPluginUI,
	Plugin,
];

describe('ThingWifiSettings', () => {
	it('should render MevrisUIView', async () => {
		const wrapper = mount(
			<MockedProvider>
				<BlueBaseApp plugins={plugins}>
					<NavigationContext.Provider
						value={
							{
								getParam: jest.fn().mockReturnValue('some-dummy-thing-id'),
							} as any
						}
					>
						<ThingWifiSettings />
					</NavigationContext.Provider>
				</BlueBaseApp>
			</MockedProvider>
		);

		await waitForElement(wrapper, 'MevrisUIView');

		expect(wrapper.find('MevrisUIView').first().prop('ui')).toBe('WifiSettings');
	});

	it('should render null when there is no thingId', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<NavigationContext.Provider
					value={
						{
							getParam: jest.fn().mockReturnValue(undefined),
						} as any
					}
				>
					<ThingWifiSettings />
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ThingWifiSettings);

		expect(wrapper.find('MevrisUIView')).toHaveLength(0);
	});
});
