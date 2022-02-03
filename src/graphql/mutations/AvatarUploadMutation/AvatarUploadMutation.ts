import { AvatarQuery } from '../../queries';
import { BlueBase } from '@bluebase/core';
import gql from 'graphql-tag';

export const AvatarUpdateMutation = gql`
	mutation($data: UploadImageString!) {
		uploadBase64Image(input: $data) {
			link
		}
	}
`;
export function AvatarUpdateMutationUpdateFn(id: string, type: string, BB: BlueBase) {
	return (store: any, { data }: any) => {
		try {
			const res = store.readQuery({
				query: AvatarQuery(type),
				variables: { id },
			});
			res.node.avatar = data.uploadBase64Image.link;
			store.writeQuery({
				data: res,
				query: AvatarQuery(type),
			});
		} catch (e) {
			BB.Logger.error('Error while uploading Image', e);
		}
	};
}
