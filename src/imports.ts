import { DangerSettingActionProps, SidebarLayoutProps } from '@blueeast/client-plugin-ui';
import { ErrorStateProps, getComponentWithFallback } from '@bluebase/components';

import { JsonLayoutProps } from '@bluebase/plugin-json-schema-components';
import { MevrisUIViewProps } from '@mevris/client-plugin-device-controllers';
import { PlaceListProps } from '@mevris/client-plugin-ui';

export const DangerSettingAction = getComponentWithFallback<DangerSettingActionProps>({
	moduleName: '@blueeast/client-plugin-ui',
	name: 'DangerSettingAction',
})('DangerSettingAction');
DangerSettingAction.displayName = 'DangerSettingAction';

export const JsonLayout = getComponentWithFallback<JsonLayoutProps>({
	moduleName: '@bluebase/plugin-json-schema-components',
	name: 'JsonLayout',
})('JsonLayout');
JsonLayout.displayName = 'JsonLayout';

export const MevrisUIView = getComponentWithFallback<MevrisUIViewProps>({
	moduleName: '@mevris/client-plugin-device-controllers',
	name: 'MevrisUIView',
})('MevrisUIView');
MevrisUIView.displayName = 'MevrisUIView';

export const NotFoundError = getComponentWithFallback<ErrorStateProps>({
	moduleName: '@blueeast/client-plugin-ui',
	name: 'NotFoundError',
})('NotFoundError');
NotFoundError.displayName = 'NotFoundError';

export const PlaceList = getComponentWithFallback<PlaceListProps>({
	moduleName: '@mevris/client-plugin-ui',
	name: 'PlaceList',
})('PlaceList');
PlaceList.displayName = 'PlaceList';

export const SidebarLayout = getComponentWithFallback<SidebarLayoutProps>({
	moduleName: '@blueeast/client-plugin-ui',
	name: 'SidebarLayout',
})('SidebarLayout');
SidebarLayout.displayName = 'SidebarLayout';
