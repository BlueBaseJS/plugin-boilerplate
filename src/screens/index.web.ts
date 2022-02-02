import { withThingValidation } from '../helpers';

export const screens = {
	ThingProfileOverviewScreen: import('./ThingProfileOverviewScreen'),
	ThingProfileScreen: {
		applyStyles: false,
		hocs: [withThingValidation],
		value: import('./ThingProfileScreen'),
	},
	ThingProfileSensorsScreen: import('./ThingProfileSensorsScreen'),
	ThingSettingsScreen: {
		applyStyles: false,
		hocs: [withThingValidation],
		value: import('./ThingSettingsScreen'),
	},
	ThingsAppScreen: import('./ThingsAppScreen'),
};
