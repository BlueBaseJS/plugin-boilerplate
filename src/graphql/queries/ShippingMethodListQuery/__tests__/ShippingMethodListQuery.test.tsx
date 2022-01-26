import { ShippingMethodListQueryMocks } from '../__mocks__';
import { ShippingMethodListQueryUpdateQueryFn } from '../ShippingMethodListQuery.graphql';

describe('ShippingMethodListQuery', () => {
	describe('updateQuery method', () => {
		it('should return previous result as is if there is no new result', async () => {
			// Execute function with mocked result
			const result = ShippingMethodListQueryUpdateQueryFn(
				ShippingMethodListQueryMocks.success()[0].result.data,
				{}
			);

			// assert
			expect(result.shippingMethods.edges).toHaveLength(10);
			expect(result.shippingMethods.pageInfo.hasNextPage).toBe(true);
			expect(result.shippingMethods.pageInfo.hasPreviousPage).toBe(false);
			expect(result.shippingMethods.pageInfo.startCursor).toBe(0);
			expect(result.shippingMethods.pageInfo.endCursor).toBe(9);
		});
		it('should return previous result as is if new result has no edges', async () => {
			// Execute function with mocked result
			const result = ShippingMethodListQueryUpdateQueryFn(ShippingMethodListQueryMocks.success()[0].result.data, {
				fetchMoreResult: {},
			});

			// assert
			expect(result.shippingMethods.edges).toHaveLength(10);
			expect(result.shippingMethods.pageInfo.hasNextPage).toBe(true);
			expect(result.shippingMethods.pageInfo.hasPreviousPage).toBe(false);
			expect(result.shippingMethods.pageInfo.startCursor).toBe(0);
			expect(result.shippingMethods.pageInfo.endCursor).toBe(9);
		});

		it('should merge new and previous data', async () => {
			// Execute function with mocked result
			const result = ShippingMethodListQueryUpdateQueryFn(ShippingMethodListQueryMocks.success()[0].result.data, {
				fetchMoreResult: ShippingMethodListQueryMocks.success()[1].result.data,
			});

			// assert
			expect(result.shippingMethods.edges).toHaveLength(20);
			expect(result.shippingMethods.pageInfo.hasNextPage).toBe(true);
			expect(result.shippingMethods.pageInfo.hasPreviousPage).toBe(false);
			expect(result.shippingMethods.pageInfo.startCursor).toBe(0);
			expect(result.shippingMethods.pageInfo.endCursor).toBe(18);
		});
	});
});
