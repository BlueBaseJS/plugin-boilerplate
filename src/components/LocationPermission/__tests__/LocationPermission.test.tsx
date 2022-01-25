jest.mock('../../../hooks/usePermissions/usePermissions', () => ({
	usePermissions: jest.fn().mockReturnValue([{ status: 'granted' }, jest.fn(), jest.fn()]),
}));

import { BlueBaseApp } from '@bluebase/core';
import { LocationPermission } from '../LocationPermission';
import { PermissionAskComponent } from '../../Permission/PermissionAskComponent';
import { PermissionDeniedComponent } from '../../Permission/PermissionDeniedComponent';
import React from 'react';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { usePermissions } from '../../../hooks/usePermissions/usePermissions';
import { waitForElement } from 'enzyme-async-helpers';

describe('LocationPermission', () => {
	it('should render children when location is successfully fetched', async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<LocationPermission>
					<Text testID="result">Hello World</Text>
				</LocationPermission>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, LocationPermission);

		expect(wrapper.find('[testID="result"]').exists()).toBe(true);

		wrapper.unmount();
	});

	it('should render LocationAskPermissionView when permission is "undetermined"', async () => {
		(usePermissions as jest.Mock).mockReturnValue([
			{ status: 'undetermined' },
			jest.fn(),
			jest.fn(),
		]);

		const wrapper = mount(
			<BlueBaseApp>
				<LocationPermission>
					<Text testID="result">Hello World</Text>
				</LocationPermission>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, PermissionAskComponent);

		expect(wrapper.find(PermissionAskComponent).exists()).toBe(true);
	});

	it('should render LocationPermissionDeniedView when permission is "denied"', async () => {
		(usePermissions as jest.Mock).mockReturnValue([{ status: 'denied' }, jest.fn(), jest.fn()]);

		const wrapper = mount(
			<BlueBaseApp>
				<LocationPermission>
					<Text testID="result">Hello World</Text>
				</LocationPermission>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, PermissionDeniedComponent);

		expect(wrapper.find(PermissionDeniedComponent).exists()).toBe(true);
	});
});
