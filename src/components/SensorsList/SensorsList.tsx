import { EmptyState, Noop } from '@bluebase/components';
import { getComponent, isMobile } from '@bluebase/core';

import { MevrisUIViewProps } from '@mevris/client-plugin-device-controllers';
import React from 'react';

const MevrisUIView = getComponent<MevrisUIViewProps>('MevrisUIView');

export interface SensorsListProps {
	id: string;
	children?: React.ReactNode;

	widget: boolean;
	title?: string;
}

export const SensorsList = (props: SensorsListProps) => {
	return (
		<MevrisUIView
			ui="SensorsList"
			filter="mevris.app.things.sensors-list"
			EmptyComponent={isMobile() ? EmptyState : Noop}
			{...props}
		/>
	);
};

SensorsList.defaultProps = {
	title: 'Sensors',
	widget: true,
};
