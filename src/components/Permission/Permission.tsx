/* eslint-disable max-len */
import { MaybeRenderPropChildren, renderChildrenWithProps, useIntl } from '@bluebase/core';
import { PermissionAlertParams, usePermissions } from '../../hooks';

import { PermissionAskComponent } from './PermissionAskComponent';
import { PermissionDeniedComponent } from './PermissionDeniedComponent';
import { PermissionType } from 'expo-permissions';
import { PermissionsOptions } from 'expo-permissions/build/PermissionsHooks';
import React from 'react';
import get from 'lodash.get';
import { renderElement } from './renderElement';
import { useAlert } from '@blueeast/client-plugin-ui';

export interface PermissionAskComponentProps {
	title?: string;
	message?: string;
	requestPermission: () => Promise<void>;
}

export interface PermissionDeniedComponentProps {
	title?: string;
	message?: string;
}

export interface PermissionResponse {
	status: string;
}

export interface PermissionProps {
	type: PermissionType;

	options?: PermissionsOptions;

	prompts?: {
		ask?: PermissionAlertParams;
		deny?: PermissionAlertParams;
	};

	/**
	 * This component is rendered when permission status is "undetermined"
	 */
	PermissionAskComponent: React.ComponentType<PermissionAskComponentProps> | React.ReactElement;

	/**
	 * This component is rendered when permission status is "denied"
	 */
	PermissionDeniedComponent:
		| React.ComponentType<PermissionDeniedComponentProps>
		| React.ReactElement;

	/**
	 * This prop will allow the denied alert to render
	 */
	permissionDeniedAlert?: boolean;

	children?: MaybeRenderPropChildren<any>;
}

export const Permission = (props: PermissionProps) => {
	const {
		type,
		options,
		prompts,
		children,
		permissionDeniedAlert,
		PermissionAskComponent,
		PermissionDeniedComponent,
	} = props;

	const { __ } = useIntl();
	const { alert } = useAlert();

	const permissions = usePermissions(
		type,
		options,
		get(prompts, 'ask', {} as PermissionAlertParams)
	);

	const [permission, askPermission] = permissions;
	function renderUndeterminedState() {
		const ask = get(prompts, 'ask', {} as PermissionAlertParams);

		return renderElement(PermissionAskComponent, {
			requestPermission: askPermission,
			title: ask.title,
			message: ask.message,
		});
	}

	function renderDeniedState() {
		const deny = get(prompts, 'deny', {} as PermissionAlertParams);

		if (permissionDeniedAlert) {
			alert(__(deny.title), deny.message && __(deny.message), [
				{
					style: 'cancel',
					text: __('Cancel'),
				},
			]);
			return;
		}

		return renderElement(PermissionDeniedComponent, {
			title: deny.title,
			message: deny.message,
		});
	}

	return (
		<React.Fragment>
			{(!permission || permission.status === 'undetermined') && renderUndeterminedState()}
			{permission && permission.status === 'denied' && renderDeniedState()}
			{permission &&
				permission.status === 'granted' &&
				renderChildrenWithProps(children, permissions)}
		</React.Fragment>
	);
};

Permission.displayName = 'Permission';

Permission.defaultProps = {
	PermissionAskComponent,
	PermissionDeniedComponent,
	permissionDeniedAlert: false,

	prompts: {
		deny: {
			title: 'Permission denied',
			message: `Without this permission, the app is unable to scan QR codes, take or update pictures for your profile, things and places.`,
		},
	},
};
