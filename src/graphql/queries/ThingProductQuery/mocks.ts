import { ThingProductQuery } from './ThingProductQuery';
import faker from '@faker-js/faker';

const id = '123';

export const ThingProductQueryMocks = {
	error: {
		error: Error('Network Error!'),
		request: {
			query: ThingProductQuery,
			variables: {
				id,
			},
		},
	},

	success: {
		request: {
			query: ThingProductQuery,
			variables: {
				id,
			},
		},
		result: {
			data: {
				node: {
					__typename: 'Thing',
					id,
					metadata: [
						{
							key: 'macId',
							schema: 'MACID',
							title: 'Mac ID',
							value: '807D3A4CEDBC',
						},
						{
							key: 'macId',
							schema: 'MACID',
							title: 'Mac ID',
							value: '807D3A4CEDBC',
						},
					],
					name: 'My AC',
					product: {
						__typename: 'Product',
						avatar: faker.image.technics(100, 100),
						id: '123',
						name: 'Orient Ultron Super',

						brand: {
							__typename: 'Brand',
							id: '123',
							name: 'Orient',
						},

						category: {
							__typename: 'ProductCategory',
							id: '1234',
							name: 'Air Conditioner',
						},
					},
				},
			},
		},
	},
};
