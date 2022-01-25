jest.mock('../../../hooks/usePermissions/usePermissions', () => ({
	usePermissions: jest.fn().mockReturnValue([{ status: 'granted' }, jest.fn(), jest.fn()]),
}));

import { BlueBaseApp } from '@bluebase/core';
import { CameraRollPermission } from '../CameraRollPermission';
import React from 'react';
import { Text } from '@bluebase/components';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('CameraRollPermission', () => {
	it('Test Props', async () => {

		const wrapper = mount(
			<BlueBaseApp>
				<CameraRollPermission>
					<Text testID="result">Hello World</Text>
				</CameraRollPermission>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, CameraRollPermission);

		expect(wrapper.find('[testID="result"]').exists()).toBe(true);

		wrapper.unmount();
	});
});
