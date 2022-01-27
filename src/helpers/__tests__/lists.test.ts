import { getListItemsPerPage, getListPaginationType } from '../lists';

import { isMobile } from '@bluebase/core';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn(),
}));

describe('getListPaginationType', () => {
	it('should return infinite on mobile', async () => {
		(isMobile as jest.Mock).mockReturnValue(true);
		expect(getListPaginationType()).toBe('infinite');
	});

	it('should return next-previous on desktop', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);
		expect(getListPaginationType()).toBe('next-previous');
	});
});

describe('getListItemsPerPage', () => {
	it('should return 4x columns on mobile', async () => {
		(isMobile as jest.Mock).mockReturnValue(true);
		expect(getListItemsPerPage(2)).toBe(8);
	});

	it('should return 2x columns on mobile', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);
		expect(getListItemsPerPage(2)).toBe(4);
	});
});
