import 'cross-fetch/polyfill';

import { BlueBaseApp, getComponent } from '@bluebase/core';

import BBPluginApollo from '@bluebase/plugin-apollo';
import BlueastPermissionsUI from '@blueeast/client-plugin-permissions-ui';
import MUIPlugin from '@bluebase/plugin-material-ui';
import Plugin from '../../../index';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const AvatarSetting = getComponent('AvatarSetting');
jest.mock('expo', () => ({}));

jest.mock('react-native/Libraries/ActionSheetIOS/ActionSheetIOS', () => ({
	showActionSheetWithOptions: jest.fn(),
}));
const upload = () => null;
describe('AvatarSetting', () => {
	it('should be render and display AvatarSetting', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BBPluginApollo, MUIPlugin, BlueastPermissionsUI]}>
				<AvatarSetting
					id="123"
					onImageSelect={upload}
					source={{ uri: 'https://placeimg.com/400/400/people' }}
					type={'Person'}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'AvatarSetting');
		// expect(wrapper).toMatchSnapshot();
		const id: any = wrapper
			.find('AvatarSetting')
			.first()
			.prop('id');
		const onPress: any = wrapper
			.find('[testID="AvatarSettingView"]')
			.first()
			.prop('onPress');
		onPress();
		expect(id).toBe('123');

		wrapper.unmount();
	});



});
