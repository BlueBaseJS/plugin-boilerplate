import { useNavigation, useTheme } from '@bluebase/core';

import { HeaderBackButton } from '@bluebase/components';
import React from 'react';

export interface ThingProfileBackButtonProps {}

export const ThingProfileBackButton = (_props: ThingProfileBackButtonProps) => {
	const { theme } = useTheme();
	const { goBack } = useNavigation();
	const onBackPress = () => goBack();

	return <HeaderBackButton tintColor={theme.palette.text.secondary} onPress={onBackPress} />;
};
