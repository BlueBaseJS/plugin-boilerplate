const mockAlert = jest.fn();
jest.mock('@blueeast/client-plugin-ui/dist/components/Alert/useAlert', () => ({
	useAlert: () => ({ alert: mockAlert }),
}));

const mockAskPermission = jest.fn();
jest.mock('expo-permissions', () => {
	const actual = jest.requireActual('expo-permissions');

	return {
		...actual,
		usePermissions: () => [
			{ status: 'undetermined' },
			async () => {
				mockAskPermission();
			},
		],
	};
});

import { BlueBaseApp } from '@bluebase/core';
import { Button } from 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import { usePermissions } from '../usePermissions';
import { waitForElement } from 'enzyme-async-helpers';

const Permission = (_props: any) => {
	const [, askPermission] = usePermissions('location');
	return <Button title="granted" onPress={askPermission} />;
};

describe('use Permission', () => {
	it('should ', async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<Permission />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Permission);
		// console.log(wrapper.props().);

		expect(wrapper.find('Button').props().title).toBe('granted');
		const alert: any = await wrapper.find('Button').prop('onPress');

		alert();
		expect(mockAlert).toHaveBeenCalledTimes(1);

		const onAllow: any = mockAlert.mock.calls[0][2][1].onPress;

		onAllow();
		expect(mockAskPermission).toHaveBeenCalledTimes(1);

		wrapper.unmount();
	});
});
