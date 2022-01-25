/* eslint-disable max-len */
/* istanbul ignore file */

import { LOCATION } from 'expo-permissions';
import { PermissionAlertParams } from '../hooks';

export const prompts: { [key: string]: PermissionAlertParams } = {
	[LOCATION]: {
		title: `Permission required to access your device's location?`,
		message: 'Allow this App to access location of your device',
	},

	camera: {
		title: `Permission required to access your device's gallery?`,
		message: `Allow this App to access photos and media from your device?`,
	},

	default: {
		title: `Permission Required`,
		message: `Allow this App to access photos and media from your device?`,
	},
};
