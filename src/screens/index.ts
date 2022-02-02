import { BootOptions } from '@bluebase/core';
import { ThingProfileOverviewScreen } from './ThingProfileOverviewScreen';
import { ThingProfileScreen } from './ThingProfileScreen';
import { ThingProfileSensorsScreen } from './ThingProfileSensorsScreen';
import { ThingSettingsScreen } from './ThingSettingsScreen';
import { ThingsAppScreen } from './ThingsAppScreen';
import { withThingValidation } from '../helpers';

export const screens: BootOptions['components'] = {
	ThingProfileOverviewScreen,
	ThingProfileScreen: {
		applyStyles: false,
		hocs: [withThingValidation],
		value: ThingProfileScreen,
	},
	ThingProfileSensorsScreen,
	ThingSettingsScreen: {
		applyStyles: false,
		hocs: [withThingValidation],
		value: ThingSettingsScreen,
	},
	ThingsAppScreen,
};
