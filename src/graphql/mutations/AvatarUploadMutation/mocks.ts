import { AvatarUpdateMutation } from './AvatarUploadMutation';
import faker from '@faker-js/faker';

export const AvatarUpdateMutationMocks = {
	success: {
		request: {
			query: AvatarUpdateMutation,
			variables: {
				data: {
					id: '123',
					image: 'dummy',
				},
			},
		},
		result: {
			data: {
				uploadBase64Image: {
					link: faker.image.avatar(),
				},
			},
		},
	},
};
