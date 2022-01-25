/* eslint-disable max-len */
import { ComponentState } from '@bluebase/components';
import { PermissionAskComponentProps } from './Permission';
import React from 'react';

export const PermissionAskComponent = ({
	requestPermission,
	title,
	message,
}: PermissionAskComponentProps) => (
	<ComponentState
		actionTitle="Grant Access"
		actionProps={{
			color: 'primary',
			size: 'small',
			variant: 'contained',
		}}
		actionOnPress={requestPermission}
		title={title}
		description={message}
	/>
);

PermissionAskComponent.displayName = 'PermissionAskComponent';

PermissionAskComponent.defaultProps = {
	title: 'Permission Required',
	message: 'Mevris requires camera access to scan QR odes to add devices and take pictures to update display picture of your account profile, things and places.',
};
