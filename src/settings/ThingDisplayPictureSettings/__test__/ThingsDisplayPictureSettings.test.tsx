import 'cross-fetch/polyfill';

import Apollo from '@bluebase/plugin-apollo';
import AvatarSetting from '../../AvatarSetting';
import { BlueBaseApp } from '@bluebase/core';
import MUI from '@bluebase/plugin-material-ui';
import { Noop } from '@bluebase/components';
import Plugin from '../../../index';
import React from 'react';
import { ThingDisplayPictureSettings } from '../ThingDisplayPictureSettings';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ThingDisplayPictureSettings', () => {
	it('should show AvatarSetting', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, Apollo, MUI]} components={{ AvatarSetting: Noop }}>
				<ThingDisplayPictureSettings />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, ThingDisplayPictureSettings);

		expect(wrapper.find(AvatarSetting).exists()).toBe(true);
	});
});
