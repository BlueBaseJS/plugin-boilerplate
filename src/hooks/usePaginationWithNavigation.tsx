import React from 'react';
import { useNavigation } from '@bluebase/core';

export interface PaginationWithNavigation {
	addToSearch: boolean;
	searchKey: string;
	page: number;
}

/**
 * A hook that makes it possible to use pagination with navigation state
 * @param Component
 * @param options
 */
export function usePaginationWithNavigation(options?: Partial<PaginationWithNavigation>) {
	const { addToSearch, searchKey } = {
		addToSearch: true,
		searchKey: 'page',
		...options,
	};

	const { getParam, setParams } = useNavigation();
	const page = getParam(searchKey, undefined);
	const onPageChange = (pageNum: number) => {
		return setParams({ [searchKey]: pageNum }, addToSearch);
	};

	return { page, onPageChange };
}

/**
 * HOC that makes it possible to use pagination with navigation state
 * @param Component
 * @param options
 */
export function withPaginationWithNavigation<T = any>(
	Component: React.ComponentType<T>,
	options?: Partial<PaginationWithNavigation>
): React.ComponentType<T> {
	const ListNavigationComponent = (props: T) => {
		const { page, onPageChange } = usePaginationWithNavigation(options);
		return (
			<Component {...props} page={options ? options.page : page} onPageChange={onPageChange} />
		);
	};
	ListNavigationComponent.displayName = 'ListNavigationComponent';

	return ListNavigationComponent;
}
