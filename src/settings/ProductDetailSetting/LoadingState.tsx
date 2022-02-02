import React from 'react';
import { getComponent } from '@bluebase/core';

const SkeletonListItem = getComponent('SkeletonListItem');

export const ProductDetailSettingLoadingState = () => <SkeletonListItem avatar description />;
ProductDetailSettingLoadingState.displayName = 'ProductInfoLoadingState';
