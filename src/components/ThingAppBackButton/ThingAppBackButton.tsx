import { useNavigation, useTheme } from '@bluebase/core';

import { HeaderBackButton } from '@bluebase/components';
import React from 'react';

export interface ThingAppBackButtonProps {}

export const ThingAppBackButton = (_props: ThingAppBackButtonProps) => {
	const { theme } = useTheme();
	const { navigate } = useNavigation();
	const onBackPress = () => navigate('Home');

	return <HeaderBackButton tintColor={theme.palette.text.secondary} onPress={onBackPress} />;
};
