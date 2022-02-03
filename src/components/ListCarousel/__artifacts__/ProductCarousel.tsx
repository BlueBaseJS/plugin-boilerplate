import { ListCarouselProps } from '../ListCarousel';
import { ProductGrid } from '../../GraphqlList/__artifacts__/ProductGrid';
import React from 'react';
import { getComponent } from '@bluebase/core';

const ListCarousel = getComponent<ListCarouselProps>('ListCarousel');

export interface ProductCarouselProps extends Partial<ListCarouselProps> {}

export const ProductCarousel = (props: ProductCarouselProps) => {
	return <ListCarousel GraphqlListComponent={ProductGrid} title="Products" {...props} />;
};
