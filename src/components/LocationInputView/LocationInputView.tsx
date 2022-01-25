import {
	Button,
	Card,
	Divider,
	IconButton,
	List,
	SafeAreaView,
	View
} from '@bluebase/components';
import { getComponent, useIntl, useStyles } from '@bluebase/core';
import React, { useCallback, useRef, useState } from 'react';
import { ViewStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { LocationObject } from '../../types';
import { AvatarMarkerProps } from '../AvatarMarker';
import { LocationInputDialogProps } from '../LocationInputDialog';
import { PulseProps } from '../Pulse';

const AvatarMarker = getComponent<AvatarMarkerProps>('AvatarMarker');
const LocationInputDialog = getComponent<LocationInputDialogProps>('LocationInputDialog');
const Pulse = getComponent<PulseProps>('Pulse');
const MapView = getComponent('MapView');
const LocateMeButton = getComponent('LocateMeButton');

// https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
const mapOptions = {
	controlSize: 24,
	streetViewControl: false,

	mapTypeControlOptions: {
		style: 2, // Dropdown
	},
};

export interface LocationInputViewStyles {
	root: ViewStyle;
	map: ViewStyle;
	marker: ViewStyle;
	pulse: ViewStyle;
	actions: ViewStyle;
	spacer: ViewStyle;
	cancelButton: ViewStyle;
}

export type LocationInputViewOnSubmitFn = (options: {
	coordinates: LocationObject;
	setSubmitting: (isSubmitting: boolean) => void;
}) => void;

export interface LocationInputViewProps {
	latitude: number;
	longitude: number;
	title?: React.ReactNode;
	description?: React.ReactNode;
	styles?: Partial<LocationInputViewStyles>;
	onSubmit: LocationInputViewOnSubmitFn;
	onCancel: () => void;
	avatarMarkerProps?: AvatarMarkerProps;
	testID?: string;
}

const defaultStyles = (): LocationInputViewStyles => ({
	root: {
		flex: 1,
	},

	map: {
		flexGrow: 1,
		// minHeight: 300,
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

	actions: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	spacer: {
		flex: 1,
	},

	cancelButton: {
		marginRight: 8,
	},
});

export const LocationInputView = (props: LocationInputViewProps) => {
	const { avatarMarkerProps, title, description, onSubmit, onCancel } = props;
	const styles = useStyles('LocationInputView', props, defaultStyles);

	const { __ } = useIntl();
	const [location, setLocation] = useState<LocationObject>({
		latitude: props.latitude || 0,
		latitudeDelta: 0.0056198344733822125,
		longitude: props.longitude || 0,
		longitudeDelta: 0.004053488373756409,
	});
	const [dialogVisible, setDialogVisible] = useState(false);
	const [isSubmitting, setSubmitting] = useState(false);

	const marker = useRef<Animatable.View>(null);

	/**
	 * Animates the marker with a bounce animation
	 */
	function bounceMarker() {
		(marker as any).current.bounce(800);
	}

	/**
	 * Toggles dialog visibility
	 */
	const toggleDialog = useCallback(() => setDialogVisible(!dialogVisible), [
		dialogVisible,
		setDialogVisible,
	]);

	/**
	 * Updates location coordinates, and animates marker
	 */
	function updateCoordinates(input: LocationObject) {
		if (input.latitude === location.latitude && input.longitude === location.longitude) {
			return;
		}

		setLocation({
			latitude: input.latitude,
			latitudeDelta: input.latitudeDelta || location.latitudeDelta,
			longitude: input.longitude,
			longitudeDelta: input.longitudeDelta || location.longitudeDelta,
		});

		bounceMarker();
	}

	/**
	 * Updates location when the submit button is pressed on the dialog
	 */
	function onDialogSubmit(coordinates: LocationObject) {
		updateCoordinates(coordinates);
		toggleDialog();
	}

	/**
	 * onPress handler of the "Save" button
	 */
	function handleSubmit() {
		onSubmit({
			coordinates: location,
			setSubmitting,
		});
	}

	return (
		<View style={styles.root}>
			<LocationInputDialog
				visible={dialogVisible}
				onSubmit={onDialogSubmit}
				latitude={location.latitude}
				longitude={location.longitude}
				onDismiss={toggleDialog}
			/>
			<List.Item
				title={title}
				description={description}
				left={<List.Avatar type="icon" icon="home-map-marker" />}
				right={<IconButton name="dots-vertical" onPress={toggleDialog} />}
			/>
			<Divider />
			<View style={{ flex: 1 }}>
				<MapView
					region={location}
					options={mapOptions}
					provider="google"
					style={styles.map}
					onRegionChangeComplete={updateCoordinates}
				/>
				<View style={styles.pulse}>
					<Pulse size={30} />
				</View>
				<Animatable.View style={styles.marker} ref={marker as any}>
					<AvatarMarker type="image" image="Placeholder" {...avatarMarkerProps} />
				</Animatable.View>
			</View>
			<Divider />
			<Card.Actions>
				<SafeAreaView style={styles.actions}>
					<LocateMeButton onLocationUpdate={updateCoordinates} />
					<View style={styles.spacer} />
					<Button
						title={__('Cancel')}
						color="primary"
						size="small"
						onPress={onCancel}
						variant="text"
						style={styles.cancelButton}
					/>
					<Button
						title={__('Save')}
						color="primary"
						loading={isSubmitting}
						disabled={isSubmitting}
						size="small"
						onPress={handleSubmit}
						variant="contained"
					/>
				</SafeAreaView>
			</Card.Actions>
		</View>
	);
};

LocationInputView.defaultProps = {
	description: 'You can drag the marker, or click anywhere on the map to adjust the position',
	title: 'Confirm Location',
};
