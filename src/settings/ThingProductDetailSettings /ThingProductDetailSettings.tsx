import ProductDetailSetting from '../ProductDetailSetting';
import React from 'react';
import { useNavigation } from '@bluebase/core';

export const ThingProductDetailSettings = () => {
	const { getParam } = useNavigation();

	const thingId = getParam('thingId', null);
	return (
		<ProductDetailSetting thingId={thingId} />
	);
};

ThingProductDetailSettings.displayName = 'ThingProductDetailSettings';
