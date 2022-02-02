import {
	ActivityIndicator,
	ComponentState,
	Dialog,
	Divider,
	Icon,
	List,
	StatefulComponent,
} from '@bluebase/components';
import {
	PlaceQuery,
	ThingPlaceQuery,
	ThingPlaceUpdateMutation,
	ThingPlaceUpdateMutationUpdateFn,
} from '../../graphql';
import React, { useState } from 'react';
import { useBlueBase, useIntl, useNavigation } from '@bluebase/core';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { LoadingState } from './LoadingState';
import { PlaceList } from '../../imports';
import { Platform } from 'react-native';
import get from 'lodash.get';

export interface ThingPlaceSelectorProps {
	thingId: string;
	picker?: boolean;
}

export const ThingPlaceSelector = ({ thingId, picker }: ThingPlaceSelectorProps) => {
	const BB = useBlueBase();
	const { __ } = useIntl();
	const [dialogVisible, setDialogVisible] = useState(false);
	const [dialog, setDialog] = useState(false);
	const { navigate } = useNavigation();
	const [mutate, { loading: mutating }] = useMutation(ThingPlaceUpdateMutation);
	const { data, loading, error } = useQuery(ThingPlaceQuery, { variables: { id: thingId } });
	const { data: placeData } = useQuery(PlaceQuery);
	const placelist = get(placeData, 'viewer.me.places.edges');

	const toggleDialog = () => {
		if (placelist.length > 0 || Platform.OS === 'web') {
			setDialogVisible(!dialogVisible);
		} else {
			showHideDialog();
		}
	};
	const showHideDialog = () => setDialog(!dialog);
	const createPlace = () => {
		showHideDialog();
		navigate('PlaceCreate');
	};

	async function updatePlace(node: any) {
		toggleDialog();
		try {
			await mutate({
				update: ThingPlaceUpdateMutationUpdateFn(thingId, BB),
				variables: {
					clientMutationId: 'clientMutationId',
					data: { id: thingId, place: node.id },
				},
			});
		} catch (e) {
			return BB.Logger.error('Error while mutating ThingPlaceSelector', e);
		}
	}

	const placeId = get(data, 'node.place.id');
	const placeName = get(data, 'node.place.name');
	const placeAvatar = get(data, 'node.place.avatar');

	const avatar = placeId && placeAvatar ? { uri: placeAvatar } : 'PlacePlaceholder';
	return (
		<StatefulComponent
			data={get(data, 'node')}
			loading={loading}
			error={error}
			loadingComponent={LoadingState}
		>
			<List.Item
				left={<List.Avatar type="image" variant="rounded" image={avatar} />}
				right={picker ? <Icon name="chevron-down" /> : mutating && <ActivityIndicator />}
				title={__('Place')}
				description={placeName || __('Select a place where this thing belongs')}
				onPress={toggleDialog}
			/>
			<Dialog visible={dialog} dismissable onDismiss={showHideDialog}>
				<ComponentState
					title={__('No Place Found')}
					description={__('Tap to add a new place')}
					actionTitle={__('Add a place')}
					actionOnPress={createPlace}
				/>
			</Dialog>
			<Dialog visible={dialogVisible} dismissable onDismiss={toggleDialog}>
				<List.Subheader>{__('Select a Place')}</List.Subheader>
				<Divider />
				<PlaceList pagination={'infinite'} itemsPerPage={10} onPress={updatePlace} />
			</Dialog>
		</StatefulComponent>
	);
};

ThingPlaceSelector.displayName = 'ThingPlaceSelector';
