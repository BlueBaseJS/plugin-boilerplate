import React from 'react';
import { getComponent } from '@bluebase/core';

export function resolveComponent<T = any>(component: string | React.ComponentType<T>) {
	return typeof component === 'string' ? getComponent(component) : component;
}
