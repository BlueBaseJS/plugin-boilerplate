import * as CurrentLocation from 'expo-location';

import { Button } from '@bluebase/components';
import { LOCATION } from 'expo-permissions';
import React from 'react';
import get from 'lodash.get';
import { useAlert } from '@blueeast/client-plugin-ui';
import { useIntl } from '@bluebase/core';
import { usePermissions } from '../../hooks';

export interface LocationMeButtonProps {
	/**
	 * Callback which will set value of latitude and longitude
	 */
	onLocationUpdate: (input: CurrentLocation.LocationObject['coords']) => void;
}

/**
 * LocateMeButton will find your current location if location
 * permissions are given . If no such permission are given
 * then it will show a dialog with error messege.
 */
export const LocateMeButton = (props: LocationMeButtonProps) => {
	const { onLocationUpdate } = props;

	const { __ } = useIntl();
	const { alert } = useAlert();
	const [permissison, askPermission] = usePermissions(LOCATION);
	async function locateMe() {
		const status = get(permissison, 'status');
		const canAskAgain = get(permissison, 'canAskAgain');
		if (status === 'granted') {
			getLocation();
		} else if (canAskAgain) {
			await askPermission();
			/* istanbul ignore next */
			getLocation();
		} else {
			alert('Location permission required');
		}
	}

	async function getLocation() {
		try {
			await CurrentLocation.watchPositionAsync(
				{
					accuracy: CurrentLocation.Accuracy.High,
				},
				/* istanbul ignore next */
				(currentPosition) => {
					/* OK, it works */
					onLocationUpdate(currentPosition?.coords);
				}
			);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Button
			title={__('Locate Me')}
			color="primary"
			size="small"
			variant="outlined"
			icon={{ name: 'crosshairs-gps', type: 'icon' }}
			onPress={locateMe}
		/>
	);
};

LocateMeButton.displayName = 'LocateMeButton';
