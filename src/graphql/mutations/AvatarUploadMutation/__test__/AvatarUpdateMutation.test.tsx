import 'cross-fetch/polyfill';

import { AvatarUpdateMutationUpdateFn } from '../AvatarUploadMutation';
import { BlueBase } from '@bluebase/core';

describe('AvatarUpdateMutation', () => {
	describe('AvatarUpdateMutationUpdateFn', () => {
		it('should show updateStore', async () => {
			const BB = new BlueBase();
			BB.Logger.error = jest.fn();

			const update = AvatarUpdateMutationUpdateFn('123', 'Person', BB);

			const store = {
				readQuery: () => ({ node: { avatar: 'dummy' } }),
				writeQuery: jest.fn(),
			};

			update(store, {
				data: {
					uploadBase64Image: {
						link: 'Hello',
					},
				},
			});
			expect(store.writeQuery.mock.calls[0][0].data).toMatchObject({ node: { avatar: 'Hello' } });
		});
		it('should log error if update fails', async () => {
			const BB = new BlueBase();
			const error = jest.fn();
			BB.Logger.error = error;

			const update = AvatarUpdateMutationUpdateFn('123', 'Person', BB);

			const store = {
				readQuery: () => ({ node: { avtar: 'dummy' } }),
				writeQuery: jest.fn().mockImplementation(() => {
					throw Error();
				}),
			};

			update(store, {
				data: {
					uploadBase64Image: {
						link: 'Hello',
					},
				},
			});

			expect(error.mock.calls[0][0]).toBe('Error while uploading Image');
		});
	});
});
