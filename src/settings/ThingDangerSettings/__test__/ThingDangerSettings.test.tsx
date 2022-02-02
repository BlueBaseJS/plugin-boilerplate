import 'cross-fetch/polyfill';

import Apollo from '@bluebase/plugin-apollo';
import { BlueBaseApp } from '@bluebase/core';
import DeleteSetting from '../../DeleteSetting';
import JsonForm from '@bluebase/plugin-json-schema-components';
import MUI from '@bluebase/plugin-material-ui';
import Plugin from '../../../index';
import React from 'react';
import { ThingDangerSettings } from '../ThingDangerSettings';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ThingDangerSettings', () => {
	it('should show ThingDangerSettings', async () => {
		// mount component
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUI, Apollo, JsonForm]}>
				<ThingDangerSettings />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, DeleteSetting);
		expect(wrapper.find(DeleteSetting).first()).toHaveLength(1);
	});
});
