import {
	PermissionResponse,
	PermissionType,
	usePermissions as useExpoPermissions,
} from 'expo-permissions';

import { PermissionAlertParams } from './types';
import { PermissionsOptions } from 'expo-permissions/build/PermissionsHooks';
import { prompts } from '../../prompts';
import { useAlert } from '@blueeast/client-plugin-ui';
import { useIntl } from '@bluebase/core';

export function usePermissions(
	type: PermissionType, // | PermissionType[],
	options?: PermissionsOptions,
	prompt?: PermissionAlertParams
): [PermissionResponse | undefined, () => Promise<void>, () => Promise<void>] {
	const { __ } = useIntl();
	const { alert } = useAlert();
	const [permission, askPermission, getPermission] = useExpoPermissions(type, options);

	async function customAskPermission() {
		const { title, message } = {
			...prompts.default,
			...prompts[type],
			...prompt,
		};

		return new Promise<void>((resolve, reject) => {
			alert(
				__(title),
				message && __(message),
				[
					{
						style: 'cancel',
						text: __('Deny'),
					},
					{
						onPress: () =>
							askPermission()
								.then((_response) => {
									return resolve;
								})
								.catch(() => {
									return reject;
								}),
						text: __('Allow'),
					},
				],
				{ cancelable: false }
			);
		});
	}

	return [permission, customAskPermission, getPermission];
}
