import { Divider, List, View } from '@bluebase/components';
import { Theme, useStyles } from '@bluebase/core';

import { AvatarMarkerProps } from '../AvatarMarker';
import { LocationMapView } from '../LocationMapView';
import React from 'react';
import { ViewStyle } from 'react-native';

export interface LocationDisplayViewStyles {
	root: ViewStyle;
	map: ViewStyle;
	pulse: ViewStyle;
	marker: ViewStyle;
}

export interface LocationDisplayViewProps {
	latitude?: number;
	longitude?: number;
	title?: React.ReactNode;
	description?: React.ReactNode;
	avatarMarkerProps?: AvatarMarkerProps;
	right?: React.ReactNode;
	styles?: Partial<LocationDisplayViewStyles>;
}

const defaultStyles = (_theme: Theme): LocationDisplayViewStyles => ({
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

// https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
export const LocationDisplayView = (props: LocationDisplayViewProps) => {
	const styles = useStyles('LocationInputView', props, defaultStyles);
	const { description, title, right } = props;

	return (
		<View style={styles.root}>
			<List.Item
				title={title}
				description={description}
				left={<List.Avatar type="icon" icon="home-map-marker" />}
				right={right}
			/>
			<Divider />
			<LocationMapView {...props} />
		</View>
	);
};

LocationDisplayView.displayName = 'LocationDisplayView';
LocationDisplayView.defaultProps = {
	description: 'You can view or edit the location here.',
	title: 'Location',
};
