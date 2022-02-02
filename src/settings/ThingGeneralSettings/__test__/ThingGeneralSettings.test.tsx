import 'cross-fetch/polyfill';

import Apollo from '@bluebase/plugin-apollo';
import { BlueBaseApp } from '@bluebase/core';
import JsonForm from '@bluebase/plugin-json-schema-components';
import MUI from '@bluebase/plugin-material-ui';
import MevrisPluginUI from '@mevris/client-plugin-ui';
import NameSetting from '../../NameSetting';
import ThingPlaceSelector from '../../ThingPlaceSelector';
import Plugin from '../../../index';
import React from 'react';
import { ThingGeneralSettings } from '../ThingGeneralSettings';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('GeneralSetting', () => {
	it('should show GeneralSetting', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUI, Apollo, JsonForm, MevrisPluginUI]}>
				<ThingGeneralSettings />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, ThingGeneralSettings);

		expect(wrapper.find(NameSetting).exists()).toBe(true);
		expect(wrapper.find(ThingPlaceSelector).exists()).toBe(true);
	});
});
