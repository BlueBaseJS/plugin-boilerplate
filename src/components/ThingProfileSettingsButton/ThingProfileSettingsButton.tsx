import { useNavigation, useTheme } from '@bluebase/core';

import { IconButton } from '@bluebase/components';
import React from 'react';

export interface ThingProfileSettingsButtonProps {
	params: any;
}

export const ThingProfileSettingsButton = ({ params }: ThingProfileSettingsButtonProps) => {
	const { theme } = useTheme();
	const { push } = useNavigation();
	const onSettingsPress = () => push('ThingSettings', params);

	return <IconButton name="cog" onPress={onSettingsPress} color={theme.palette.text.secondary} />;
};
