import { OrderListQueryMocks } from '../__mocks__';
import { OrderListQueryUpdateQueryFn } from '../OrderListQuery.graphql';

describe('OrderListQuery', () => {
	describe('updateQuery method', () => {
		it('should return previous result as is if there is no new result', async () => {
			// Execute function with mocked result
			const result = OrderListQueryUpdateQueryFn(
				OrderListQueryMocks.success()[0].result.data,
				{}
			);

			// assert
			expect(result.orders.edges).toHaveLength(10);
			expect(result.orders.pageInfo.hasNextPage).toBe(true);
			expect(result.orders.pageInfo.hasPreviousPage).toBe(false);
			expect(result.orders.pageInfo.startCursor).toBe(0);
			expect(result.orders.pageInfo.endCursor).toBe(9);
		});
		it('should return previous result as is if new result has no edges', async () => {
			// Execute function with mocked result
			const result = OrderListQueryUpdateQueryFn(OrderListQueryMocks.success()[0].result.data, {
				fetchMoreResult: {},
			});

			// assert
			expect(result.orders.edges).toHaveLength(10);
			expect(result.orders.pageInfo.hasNextPage).toBe(true);
			expect(result.orders.pageInfo.hasPreviousPage).toBe(false);
			expect(result.orders.pageInfo.startCursor).toBe(0);
			expect(result.orders.pageInfo.endCursor).toBe(9);
		});

		it('should merge new and previous data', async () => {
			// Execute function with mocked result
			const result = OrderListQueryUpdateQueryFn(OrderListQueryMocks.success()[0].result.data, {
				fetchMoreResult: OrderListQueryMocks.success()[1].result.data,
			});

			// assert
			expect(result.orders.edges).toHaveLength(20);
			expect(result.orders.pageInfo.hasNextPage).toBe(true);
			expect(result.orders.pageInfo.hasPreviousPage).toBe(false);
			expect(result.orders.pageInfo.startCursor).toBe(0);
			expect(result.orders.pageInfo.endCursor).toBe(18);
		});
	});
});
