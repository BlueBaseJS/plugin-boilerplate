import React from 'react';
import { StatefulComponent } from '@bluebase/components';
import { ThingNodeQuery } from '../../graphql';
import get from 'lodash.get';
import { getComponent } from '@bluebase/core';
import { useQuery } from '@apollo/react-hooks';

const SkeletonListItem = getComponent('SkeletonListItem');

const AvatarSetting = getComponent('AvatarSetting');

export interface AvatarSettingsStyles {}

export interface AvatarSettingsProps {
	thingId: string;
}
const loadingComponent = () => {
	return <SkeletonListItem avatar={true} description={false} />;
};
const AvatarSettings = ({ thingId }: AvatarSettingsProps) => {
	const { error, loading, data } = useQuery(ThingNodeQuery, {
		variables: { id: thingId },
	});

	const uri = get(data, 'node.avatar');
	const source = uri ? { uri } : 'ThingPlaceholder';

	return (
		<StatefulComponent
			data={data}
			loading={loading}
			loadingComponent={loadingComponent}
			error={error}
		>
			<AvatarSetting type="Thing" id={thingId} source={source} />
		</StatefulComponent>
	);
};
export { AvatarSettings as ThingsAvatarSettings };
