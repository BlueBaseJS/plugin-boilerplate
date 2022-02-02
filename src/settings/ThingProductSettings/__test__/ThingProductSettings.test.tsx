import 'cross-fetch/polyfill';

import Apollo from '@bluebase/plugin-apollo';
import { BlueBaseApp } from '@bluebase/core';
import JsonForm from '@bluebase/plugin-json-schema-components';
import MUI from '@bluebase/plugin-material-ui';
import MevrisPluginUI from '@mevris/client-plugin-ui';
import Plugin from '../../../index';
import ProductInfoSetting from '../../ProductInfoSettings';
import React from 'react';
import { ThingProductSettings } from '../ThingProductSettings';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('GeneralSetting', () => {
	it('should show GeneralSetting', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUI, Apollo, JsonForm, MevrisPluginUI]}>
				<ThingProductSettings />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, ThingProductSettings);

		expect(wrapper.find(ProductInfoSetting).exists()).toBe(true);
	});
});
