import ProductInfoSetting from '../ProductInfoSettings';
import React from 'react';
import { useNavigation } from '@bluebase/core';

export const ThingProductSettings = () => {
	const { getParam } = useNavigation();

	const thingId = getParam('thingId', null);
	return (
		<ProductInfoSetting thingId={thingId} />
	);
};

ThingProductSettings.displayName = 'ThingProductSettings';
