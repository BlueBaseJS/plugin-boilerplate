/* eslint-disable max-len */
import { Permission, PermissionProps } from '../Permission';

import { CAMERA } from 'expo-permissions';
import { CameraPermissionAskView } from '../CameraPermissionAskView';
import { CameraPermissionDeniedView } from '../CameraPermissionDeniedView';
import React from 'react';

export interface CameraPermissionProps extends Partial<PermissionProps> {}

export const CameraPermission = (props: CameraPermissionProps) => {
	return (
		<Permission
			prompts={{
				ask: {
					title: 'Permission to access your Camera',
					message:
						// eslint-disable-next-line max-len
						'Mevris requires camera access to scan QR odes to add devices and take pictures to update display picture of your account profile, things and places.',
				},

				deny: {
					title: 'Permission denied',
					message: 'Without this permission, the app is unable to access your photo gallery to take or update pictures for your profile, things and places.',
				},
			}}
			{...props}
			PermissionAskComponent={CameraPermissionAskView}
			PermissionDeniedComponent={CameraPermissionDeniedView}
			type={CAMERA}
		/>
	);
};

CameraPermission.displayName = 'CameraPermission';
