import { useNavigation, useTheme } from '@bluebase/core';

import { IconButton } from '@bluebase/components';
import React from 'react';

export interface ThingAppAddButtonProps {}

export const ThingAppAddButton = (_props: ThingAppAddButtonProps) => {
	const { theme } = useTheme();
	const { navigate } = useNavigation();
	const onSettingsPress = () => navigate('ProductsApp',{ placeId: null });

	return <IconButton name="plus" onPress={onSettingsPress} color={theme.palette.text.secondary} />;
};
