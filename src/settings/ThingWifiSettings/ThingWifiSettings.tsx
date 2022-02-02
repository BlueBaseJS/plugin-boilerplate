import { DeviceProvider } from '@mevris/client-plugin-device-controllers';
import { ErrorState } from '@bluebase/components';
import { MevrisUIView } from '../../imports';
import React from 'react';
import { useNavigation } from '@bluebase/core';

export interface ThingWifiSettingsProps { }

export const ThingWifiSettings = (_props: ThingWifiSettingsProps) => {
	const { getParam } = useNavigation();
	const id = getParam('thingId', null);

	if (!id) {
		return <ErrorState />;
	}
	return (
		<DeviceProvider id={id}>
			<MevrisUIView ui="WifiSettings" id={id} widget={false} />
		</DeviceProvider>
	);
};
