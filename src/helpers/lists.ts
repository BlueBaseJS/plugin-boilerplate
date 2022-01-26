import { PaginationType } from '@blueeast/client-plugin-ui';
import { Platform } from 'react-native';
import { isMobile } from '@bluebase/core';

export function getListPaginationType(): PaginationType {
	if (isMobile()) {
		return 'infinite';
	}

	return Platform.select({
		default: 'next-previous',
		web: 'numbered',
	});
}

export function getListItemsPerPage(columns: number): number {
	return isMobile() ? columns * 4 : columns * 2;
}
