import storiesOf from '@bluebase/storybook-addon';
import React from 'react';
import { Platform } from 'react-native';

import Main, { BigSize, DefaultSize, SmallSize } from './MyPluginIcon.stories';

/**
 * This file exists to run storybook-native@v5 stories on storybook@v6,
 * as there is no v6 stories compatibility on react native yet.
 *
 * Once this issue is solved, this file should be deleted.
 *
 * https://github.com/storybookjs/storybook/issues/11966
 */
if (Platform.OS !== 'web') {
	storiesOf(Main.title, module)
		.add(DefaultSize.storyName!, () => <DefaultSize {...(DefaultSize.args as any)} />)
		.add(SmallSize.storyName!, () => <SmallSize {...(SmallSize.args as any)} />)
		.add(BigSize.storyName!, () => <BigSize {...(BigSize.args as any)} />);
}
