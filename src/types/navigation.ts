import { NavigationActionsObject } from '@bluebase/components';

// TODO: Temporary solution, because @bluebase/components needs to be updated to add these types
export type NavigationOptionsFnParam = {
	navigation: NavigationActionsObject;
	route: any;
};
