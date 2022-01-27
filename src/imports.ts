import { CollapsibleProps, RelativeTimeProps } from '@blueeast/client-plugin-ui';
import {
	PlaceholderBody1Props,
	PlaceholderBody2Props,
	PlaceholderH4Props,
	PlaceholderListItemProps,
	PlaceholderMediaProps,
	PlaceholderOverlineProps,
	PlaceholderProps,
	PlaceholderSubtitle1Props,
} from '@bluebase/plugin-rn-placeholder';

import { getComponentWithFallback } from '@bluebase/components';

export const Collapsible = getComponentWithFallback<CollapsibleProps>({
	moduleName: '@blueeast/client-plugin-ui',
	name: 'Collapsible',
})('Collapsible');
Collapsible.displayName = 'Collapsible';

export const Placeholder = getComponentWithFallback<PlaceholderProps>({
	moduleName: '@bluebase/plugin-rn-placeholder',
	name: 'Placeholder',
})('Placeholder');
Placeholder.displayName = 'Placeholder';

export const PlaceholderBody1 = getComponentWithFallback<PlaceholderBody1Props>({
	moduleName: '@bluebase/plugin-rn-placeholder',
	name: 'PlaceholderBody1',
})('PlaceholderBody1');
PlaceholderBody1.displayName = 'PlaceholderBody1';

export const PlaceholderBody2 = getComponentWithFallback<PlaceholderBody2Props>({
	moduleName: '@bluebase/plugin-rn-placeholder',
	name: 'PlaceholderBody2',
})('PlaceholderBody2');
PlaceholderBody2.displayName = 'PlaceholderBody2';

export const PlaceholderH4 = getComponentWithFallback<PlaceholderH4Props>({
	moduleName: '@bluebase/plugin-rn-placeholder',
	name: 'PlaceholderH4',
})('PlaceholderH4');
PlaceholderH4.displayName = 'PlaceholderH4';

export const PlaceholderSubtitle1 = getComponentWithFallback<PlaceholderSubtitle1Props>({
	moduleName: '@bluebase/plugin-rn-placeholder',
	name: 'PlaceholderSubtitle1',
})('PlaceholderSubtitle1');
PlaceholderSubtitle1.displayName = 'PlaceholderSubtitle1';

export const PlaceholderListItem = getComponentWithFallback<PlaceholderListItemProps>({
	moduleName: '@bluebase/plugin-rn-placeholder',
	name: 'PlaceholderListItem',
})('PlaceholderListItem');

export const PlaceholderOverline = getComponentWithFallback<PlaceholderOverlineProps>({
	moduleName: '@bluebase/plugin-rn-placeholder',
	name: 'PlaceholderOverline',
})('PlaceholderOverline');
PlaceholderOverline.displayName = 'PlaceholderOverline';

export const PlaceholderMedia = getComponentWithFallback<PlaceholderMediaProps>({
	moduleName: '@bluebase/plugin-rn-placeholder',
	name: 'PlaceholderMedia',
})('PlaceholderMedia');

export const RelativeTime = getComponentWithFallback<RelativeTimeProps>({
	moduleName: '@blueeast/client-plugin-ui',
	name: 'RelativeTime',
})('RelativeTime');
RelativeTime.displayName = 'RelativeTime';

export const ScreenSizeConsumer = getComponentWithFallback({
	moduleName: '@bluebase/plugin-responsive-grid',
	name: 'ScreenSizeConsumer',
})('ScreenSizeConsumer');
