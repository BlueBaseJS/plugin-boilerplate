import { PaymentMethodListQueryMocks } from '../__mocks__';
import { PaymentMethodListQueryUpdateQueryFn } from '../PaymentMethodListQuery.graphql';

describe('PaymentMethodListQuery', () => {
	describe('updateQuery method', () => {
		it('should return previous result as is if there is no new result', async () => {
			// Execute function with mocked result
			const result = PaymentMethodListQueryUpdateQueryFn(
				PaymentMethodListQueryMocks.success()[0].result.data,
				{}
			);

			// assert
			expect(result.paymentMethods.edges).toHaveLength(10);
			expect(result.paymentMethods.pageInfo.hasNextPage).toBe(true);
			expect(result.paymentMethods.pageInfo.hasPreviousPage).toBe(false);
			expect(result.paymentMethods.pageInfo.startCursor).toBe(0);
			expect(result.paymentMethods.pageInfo.endCursor).toBe(9);
		});
		it('should return previous result as is if new result has no edges', async () => {
			// Execute function with mocked result
			const result = PaymentMethodListQueryUpdateQueryFn(PaymentMethodListQueryMocks.success()[0].result.data, {
				fetchMoreResult: {},
			});

			// assert
			expect(result.paymentMethods.edges).toHaveLength(10);
			expect(result.paymentMethods.pageInfo.hasNextPage).toBe(true);
			expect(result.paymentMethods.pageInfo.hasPreviousPage).toBe(false);
			expect(result.paymentMethods.pageInfo.startCursor).toBe(0);
			expect(result.paymentMethods.pageInfo.endCursor).toBe(9);
		});

		it('should merge new and previous data', async () => {
			// Execute function with mocked result
			const result = PaymentMethodListQueryUpdateQueryFn(PaymentMethodListQueryMocks.success()[0].result.data, {
				fetchMoreResult: PaymentMethodListQueryMocks.success()[1].result.data,
			});

			// assert
			expect(result.paymentMethods.edges).toHaveLength(20);
			expect(result.paymentMethods.pageInfo.hasNextPage).toBe(true);
			expect(result.paymentMethods.pageInfo.hasPreviousPage).toBe(false);
			expect(result.paymentMethods.pageInfo.startCursor).toBe(0);
			expect(result.paymentMethods.pageInfo.endCursor).toBe(18);
		});
	});
});
