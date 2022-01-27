import { VariantSelectorItemProps } from './VariantSelector';
import { getComponent } from '@bluebase/core';

const types: { [key: string]: string[] } = {
	avatar: ['AvatarVariantSelectorItem', 'Noop'],
	color: ['ColorVariantSelectorItem', 'Noop'],
	image: ['ImageVariantSelectorItem', 'Noop'],
	text: ['TextVariantSelectorItem', 'Noop'],
};

export function getItemComponent(
	component: string | React.ComponentType<VariantSelectorItemProps>
) {
	if (typeof component !== 'string') {
		return component;
	}

	const isRegistered = !!types[component];

	if (isRegistered) {
		return getComponent<VariantSelectorItemProps>(...types[component]);
	}

	return getComponent<VariantSelectorItemProps>(component);
}
