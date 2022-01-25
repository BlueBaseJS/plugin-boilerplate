/* eslint-disable max-len */
import Permission, { PermissionProps } from '../Permission';

import { CAMERA_ROLL } from 'expo-permissions';
import React from 'react';

export interface CameraRollPermissionProps extends Partial<PermissionProps> {}

export const CameraRollPermission = (props: CameraRollPermissionProps) => {
	return (
		<Permission
			prompts={{
				ask: {
					title: 'Permission to access gallery',
					message:
						// eslint-disable-next-line max-len
						'Mevris requires access to your photo gallery to update display picture of your account profile, things and places',
				},

				deny: {
					title: 'Permission denied',
					message: 'Without this permission, the app is unable to access your photo gallery to take or update pictures for your profile, things and places.',
				},
			}}
			{...props}
			type={CAMERA_ROLL}
		/>
	);
};

CameraRollPermission.displayName = 'CameraRollPermission';
