jest.mock('../../../hooks/usePermissions/usePermissions', () => ({
	usePermissions: jest.fn().mockReturnValue([{ status: 'granted' }, jest.fn(), jest.fn()]),
}));

import { BlueBaseApp } from '@bluebase/core';
import { Permission } from '../Permission';
import { PermissionAskComponent } from '../PermissionAskComponent';
import { PermissionDeniedComponent } from '../PermissionDeniedComponent';
import React from 'react';
import { Text } from '@bluebase/components';
import { mount } from 'enzyme';
import { usePermissions } from '../../../hooks/usePermissions/usePermissions';
import { waitForElement } from 'enzyme-async-helpers';

describe('Permission', () => {
	it('should render children when Permission is granted', async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<Permission
					type="camera"
					permissionDeniedAlert={true}
					PermissionAskComponent={PermissionAskComponent}
					PermissionDeniedComponent={PermissionDeniedComponent}
				>
					<Text testID="children">children component</Text>
				</Permission>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Permission);

		// expect(wrapper).toMatchSnapshot();

		expect(wrapper.props().children.props.children.props.children).toBe('children component');
	});

	it('should render children when isCompatible is false', async () => {
		(usePermissions as jest.Mock).mockReturnValue([
			{ status: 'undetermined' },
			jest.fn(),
			jest.fn(),
		]);

		const wrapper = mount(
			<BlueBaseApp>
				<Permission
					type="camera"
					permissionDeniedAlert={true}
					PermissionAskComponent={PermissionAskComponent}
					PermissionDeniedComponent={PermissionDeniedComponent}
				>
					<Text testID="children">children component</Text>
				</Permission>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Permission);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.props().children.props.children.props.children).toBe('children component');
	});

	it('should create element if permission denied is not a valid element', async () => {
		(usePermissions as jest.Mock).mockReturnValue([{ status: 'denied' }, jest.fn(), jest.fn()]);

		const wrapper = mount(
			<BlueBaseApp>
				<Permission type="camera" PermissionDeniedComponent={PermissionDeniedComponent}>
					<Text testID="children">children component</Text>
				</Permission>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Permission);

		// expect(wrapper).toMatchSnapshot();

		expect((wrapper as any).find('Text').last().text()).toEqual(
			// eslint-disable-next-line max-len
			'Without this permission, the app is unable to scan QR codes, take or update pictures for your profile, things and places.',
		);
	});

	it('should create element if permission denied is not a valid element', async () => {
		(usePermissions as jest.Mock).mockReturnValue([{ status: 'denied' }, jest.fn(), jest.fn()]);

		const wrapper = mount(
			<BlueBaseApp>
				<Permission
					type="camera"
					permissionDeniedAlert={true}
					PermissionDeniedComponent={PermissionDeniedComponent}
				>
					<Text testID="children">children component</Text>
				</Permission>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Permission);

		// expect(wrapper).toMatchSnapshot();

		expect(wrapper as any).toBeDefined();
	});

	// it('should ask for Permission if permission status id undetermined on native', async () => {

	// 	const wrapper = mount(
	// 		<BlueBaseApp>
	// 			<Permission type='camera'>
	// 				<Text testID="children">children component</Text>
	// 			</Permission>
	// 		</BlueBaseApp>
	// 	);

	// 	await waitForElement(wrapper, Permission);

	// 	// expect(wrapper).toMatchSnapshot();

	// 	expect(
	// 		(wrapper as any)
	// 			.find('ComponentState')
	// 			.first()
	// 			.prop('title')
	// 	).toEqual('Permission');
	// });

	// it('should show ask permission element', async () => {

	// 	const wrapper = mount(
	// 		<BlueBaseApp>
	// 			<Permission type="camera">
	// 				<Text testID="children">children component</Text>
	// 			</Permission>
	// 		</BlueBaseApp>
	// 	);

	// 	await waitForElement(wrapper, Permission);

	// 	// expect(wrapper).toMatchSnapshot();

	// 	expect(
	// 		(wrapper as any)
	// 			.find('Text')
	// 			.last()
	// 			.text()
	// 	).toEqual('AskPermissionElement');
	// });
	// it('should show null if ask permission is null', async () => {

	// 	const wrapper = mount(
	// 		<BlueBaseApp>
	// 			<Permission type="camera">
	// 				<Text testID="children">children component</Text>
	// 			</Permission>
	// 		</BlueBaseApp>
	// 	);

	// 	await waitForElement(wrapper, Permission);

	// 	// expect(wrapper).toMatchSnapshot();

	//   expect(wrapper.props().children.props.PermissionDeniedComponent.props.children).toBe('PermissionDenied');

	// });

	// it('should use default prop is compatible and ask permission if not provided', async () => {

	// 	const wrapper = mount(
	// 		<BlueBaseApp>
	// 			<Permission type="camera">
	// 				<Text testID="children">children component</Text>
	// 			</Permission>
	// 		</BlueBaseApp>
	// 	);

	// 	await waitForElement(wrapper, 'Permission');

	// 	// expect(wrapper).toMatchSnapshot();

	// 	expect(wrapper.find('ComponentState').first()).toBeDefined();
	// });
});
