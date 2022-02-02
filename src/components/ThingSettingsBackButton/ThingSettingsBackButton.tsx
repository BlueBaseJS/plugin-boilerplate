import { useNavigation, useTheme } from '@bluebase/core';

import { HeaderBackButton } from '@bluebase/components';
import React from 'react';

export interface ThingSettingsBackButtonProps {}

export const ThingSettingsBackButton = (_props: ThingSettingsBackButtonProps) => {
	const { theme } = useTheme();
	const { navigate, state } = useNavigation();
	const onBackPress = () => navigate('ThingProfile', state.params);

	return <HeaderBackButton tintColor={theme.palette.text.secondary} onPress={onBackPress} />;
};
