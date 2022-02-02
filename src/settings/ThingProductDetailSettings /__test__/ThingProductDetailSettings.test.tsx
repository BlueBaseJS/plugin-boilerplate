import 'cross-fetch/polyfill';

import { BlueBaseApp, NavigationContext } from '@bluebase/core';

import Apollo from '@bluebase/plugin-apollo';
import JsonForm from '@bluebase/plugin-json-schema-components';
import MUIplugin from '@bluebase/plugin-material-ui';
import MevrisPluginUI from '@mevris/client-plugin-ui';
import { MockedProvider } from '@apollo/client/testing';
import Plugin from '../../../index';
import React from 'react';
import { ThingProductDetailSettings } from '../ThingProductDetailSettings';
import { ThingProductQueryMocks } from '../../../mocks';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('GeneralSetting', () => {
	it('should show GeneralSetting', async () => {
		const getParam = jest.fn().mockReturnValue('123');

		const wrapper = mount(
			<BlueBaseApp plugins={[MevrisPluginUI, Plugin, Apollo, JsonForm, MUIplugin]}>
				<NavigationContext.Provider value={{ getParam } as any}>
					<MockedProvider mocks={[ThingProductQueryMocks.success]} addTypename={true}>
						<ThingProductDetailSettings />
					</MockedProvider>
				</NavigationContext.Provider>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'ThingProductDetailSettings');

		expect(wrapper.find(ThingProductDetailSettings).exists()).toBe(true);
	});
});
