import { View } from '@bluebase/components';
import { getComponent, Theme, useStyles } from '@bluebase/core';
import React, { useRef } from 'react';
import { ViewStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { AvatarMarkerProps } from '../AvatarMarker';
import { PulseProps } from '../Pulse';

export interface LocationMapStyles {
	root: ViewStyle;
	map: ViewStyle;
	pulse: ViewStyle;
	marker: ViewStyle;
}

export interface LocationMapViewProps {
	latitude?: number;
	longitude?: number;
	title?: React.ReactNode;
	description?: React.ReactNode;
	avatarMarkerProps?: AvatarMarkerProps;
	right?: React.ReactNode;
	pulse?: boolean;
	styles?: Partial<LocationMapStyles>;
}

// https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
const mapOptions = {
	controlSize: 24,
	streetViewControl: false,

	mapTypeControlOptions: {
		style: 2, // Dropdown
	},
};

const AvatarMarker = getComponent<AvatarMarkerProps>('AvatarMarker');
const Pulse = getComponent<PulseProps>('Pulse');
const MapView = getComponent('MapView');

export const LocationMapView = (props: LocationMapViewProps) => {
	const styles = useStyles('LocationInputView', props, defaultStyles);
	const { latitude, longitude, avatarMarkerProps, pulse } = props;
	const marker = useRef<Animatable.View>(null);

	const coordinates = {
		latitude,
		longitude,

		latitudeDelta: 0.00562,
		longitudeDelta: 0.00402,
	};

	return (
		<View style={styles.map}>
			<MapView region={coordinates} options={mapOptions} provider="google" style={styles.map} />
			{pulse ? (
				<View style={styles.pulse}>
					<Pulse size={30} />
				</View>
			) : null}
			<Animatable.View style={styles.marker} ref={marker as any}>
				<AvatarMarker type="image" image="Placeholder" {...avatarMarkerProps} />
			</Animatable.View>
		</View>
	);
};

LocationMapView.displayName = 'LocationMapView';

const defaultStyles = (_theme: Theme): LocationMapStyles => ({
	map: {
		flex: 1,
	},
	marker: {
		left: '50%',
		marginLeft: -27,
		marginTop: -70,
		position: 'absolute',
		top: '50%',
	},

	pulse: {
		left: '50%',
		marginLeft: -15,
		marginTop: -37,
		position: 'absolute',
		top: '50%',
	},
	root: {
		flex: 1,
	},
});
