import { PlaceholderBody1Props } from '@bluebase/plugin-rn-placeholder';
import { getComponentWithFallback } from '@bluebase/components';

export const Placeholder = getComponentWithFallback({
	moduleName: '@bluebase/plugin-rn-placeholder',
	name: 'Placeholder',
})('Placeholder');
Placeholder.displayName = 'Placeholder';

export const PlaceholderBody1 = getComponentWithFallback<PlaceholderBody1Props>({
	moduleName: '@bluebase/plugin-rn-placeholder',
	name: 'PlaceholderBody1',
})('PlaceholderBody1');
PlaceholderBody1.displayName = 'PlaceholderBody1';

export const ThingCard = getComponentWithFallback({
	moduleName: '@mevris/client-plugin-ui',
	name: 'ThingCard',
})('ThingCard');
ThingCard.displayName = 'ThingCard';
