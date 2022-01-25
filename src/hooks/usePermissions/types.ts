import { AlertButton, AlertOptions } from 'react-native';

export interface PermissionAlertParams {
	title: string;
	message?: string;
	buttons?: AlertButton[];
	options?: AlertOptions;
}
