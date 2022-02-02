import React, { useEffect } from 'react';

import { DeviceProvider } from '@mevris/client-plugin-device-controllers';
import { NotFoundError } from '../imports';
import { StatefulComponent } from '@bluebase/components';
import { ThingNodeQuery } from '../graphql/queries/ThingNodeQuery';
import get from 'lodash.get';
import { useNavigation } from '@bluebase/core';
import { useQuery } from '@apollo/client';

/**
 * HOC that is wrapped around screens. Check if thingID exists,
 * and sets page title, if it's not already set
 * @param Component
 */

export function withThingValidation<T = any>(Component: React.ComponentType<T>) {
	return (props: T & { thingId: string }) => {
		const { getParam, setParams } = useNavigation();
		const thingId = getParam('thingId', null);
		const title = getParam('title', null);

		if (!thingId) {
			return <NotFoundError />;
		}

		const { data, loading, error } = useQuery(ThingNodeQuery, {
			fetchPolicy: 'cache-first',
			variables: { id: thingId },
		});

		useEffect(() => {
			const name = get(data, 'node.name', null);

			if (!!name && title !== name) {
				setParams({
					title: name,
				});
			}
		});

		return (
			<DeviceProvider id={thingId}>
				<StatefulComponent loading={loading} error={error} data={get(data, 'node')}>
					<Component {...props} thingId={thingId} />
				</StatefulComponent>
			</DeviceProvider>
		);
	};
}
