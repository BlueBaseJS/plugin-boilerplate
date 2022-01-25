jest.mock('../../../hooks/usePermissions/usePermissions', () => ({
	usePermissions: jest.fn().mockReturnValue([{ status: 'granted' }, jest.fn(), jest.fn()]),
}));

import { BlueBaseApp } from '@bluebase/core';
import { CameraPermission } from '../CameraPermission';
import React from 'react';
import { Text } from '@bluebase/components';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('CameraPermission  resolved', () => {
	it('Test Props', async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<CameraPermission>
					<Text> Permission Granted</Text>
				</CameraPermission>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, CameraPermission);
		const node = wrapper
			.find('CameraPermission')
			.last()
			.prop('children');
		expect(node).toEqual(<Text> Permission Granted</Text>);
	});
});
