import React, { useCallback } from 'react';

import { AlertUI } from '../Alert';
import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import { Button } from 'react-native';
import Plugin from '../../../index';
import { mount } from 'enzyme';
import { useAlert } from '../useAlert.web';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
	alert: jest.fn(),
}));

describe('Alert', () => {
	it('should show dialog', async () => {
		const itemOnPress = jest.fn();
		const onDismiss = jest.fn();

		const AlertDemo = () => {
			const { alert } = useAlert();

			const onPress = useCallback(
				() =>
					alert(
						'Hurry',
						'Buy now before time runs out!',
						[
							{ text: 'Ok', style: 'default', onPress: itemOnPress },
							{ text: 'Cancel', style: 'cancel', onPress: itemOnPress },
							{ text: 'Delete', style: 'destructive', onPress: itemOnPress },
						],
						{ onDismiss }
					),
				[]
			);

			return <Button title="Alert Me" onPress={onPress} testID="invoke" />;
		};

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI]} testID="alertTestID">
				<AlertDemo />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, AlertDemo);

		expect(wrapper.find(AlertUI).prop('visible')).toBe(false);

		const invoke: any = wrapper.find('Button[testID="invoke"]').first().prop('onPress');

		invoke();

		await waitForElement(wrapper, 'AlertUI[visible=true]');
		expect(wrapper.find(AlertUI).prop('visible')).toBe(true);

		const ok: any = wrapper.find('Button[title="Ok"]').first().prop('onPress');

		ok();

		expect(itemOnPress).toHaveBeenCalledTimes(1);

		const dismiss: any = wrapper.find('AlertUI').first().prop('onDismiss');

		dismiss();

		expect(onDismiss).toHaveBeenCalledTimes(0);
	});
});
