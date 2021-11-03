
import { BootOptions } from '@bluebase/core';

import { MyPluginHomeScreen } from './MyPluginHomeScreen';
import { MyPluginSecondScreen } from './MyPluginSecondScreen';

export const screens: BootOptions['components'] = {
	MyPluginHomeScreen,
	MyPluginSecondScreen,
};
