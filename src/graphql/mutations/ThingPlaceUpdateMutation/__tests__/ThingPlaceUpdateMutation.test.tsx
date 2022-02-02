import 'cross-fetch/polyfill';

import { BlueBase } from '@bluebase/core';
import { ThingPlaceUpdateMutationUpdateFn } from '../ThingPlaceUpdateMutation';

describe('ThingPlaceUpdateMutation', () => {
	describe('ThingPlaceUpdateMutationUpdateFn', () => {
		it('should show updateStore', async () => {
			const BB = new BlueBase();
			BB.Logger.error = jest.fn();

			const update = ThingPlaceUpdateMutationUpdateFn('123', BB);

			const store = {
				readQuery: () => ({ node: { place: { name: '' } } }),
				writeQuery: jest.fn(),
			};

			update(store, {
				data: {
					updateThing: {
						thing: { place: { id: '321', name: 'test-name', avatar: 'test-avatar' } },
					},
				},
			});

			expect(store.writeQuery.mock.calls[0][0].data).toMatchObject({
				node: { place: { id: '321', name: 'test-name', avatar: 'test-avatar' } },
			});
		});

		it('should log error if update fails', async () => {
			const BB = new BlueBase();
			const error = jest.fn();
			BB.Logger.error = error;

			const update = ThingPlaceUpdateMutationUpdateFn('123', BB);

			const store = {
				readQuery: () => ({ node: { place: { name: '' } } }),
				writeQuery: jest.fn().mockImplementation(() => {
					throw Error();
				}),
			};

			update(store, {
				data: {
					updateThing: {
						thing: { place: { id: '321', name: 'test-name', avatar: 'test-avatar' } },
					},
				},
			});

			expect(error.mock.calls[0][0]).toBe('Error while updating store of PlaceSetting');
		});
	});
});
