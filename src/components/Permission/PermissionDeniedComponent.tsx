/* eslint-disable max-len */
import { ComponentState } from '@bluebase/components';
import { PermissionDeniedComponentProps } from './Permission';
import React from 'react';

export const PermissionDeniedComponent = ({ title, message }: PermissionDeniedComponentProps) => (
	<ComponentState title={title} description={message} />
);

PermissionDeniedComponent.displayName = 'PermissionDeniedComponent';

PermissionDeniedComponent.defaultProps = {
	title: `Permission denied `,
	message: `Without this permission, the app is unable to scan QR codes, take or update pictures for your profile, things and places.`,
};
