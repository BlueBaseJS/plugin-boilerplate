import { AvatarSettingView, AvatarSettingViewProps } from './AvatarSettingView';
import { AvatarUpdateMutation, AvatarUpdateMutationUpdateFn } from '../../exports';
import { ImagePickerOptions, ImagePickerResult, MediaTypeOptions } from 'expo-image-picker';
import React, { useCallback, useState } from 'react';

import { Platform } from 'react-native';
import get from 'lodash.get';
import { useBlueBase } from '@bluebase/core';
import { useImagePicker } from '../../hooks';
import { useMutation } from '@apollo/react-hooks';

const imagePickerOptions: ImagePickerOptions = {
	allowsEditing: false,
	allowsMultipleSelection: false,
	aspect: [1, 1],
	base64: true,
	exif: true,
	mediaTypes: MediaTypeOptions.Images,
	quality: 0.8,
};

export interface AvatarSettingProps extends Omit<AvatarSettingViewProps, 'loading' | 'error'> {
	onImageSelect?: (result: object) => void;
	id: string;
	type: AvatarType;
}

type AvatarType = 'Person' | 'Thing' | 'Place' | string;

export const AvatarSetting = (props: AvatarSettingProps) => {
	const { onImageSelect, source: _source, type, ...imageView } = props;

	const BB = useBlueBase();
	const showImagePicker = useImagePicker();
	const [source, setSource] = useState(props.source);
	const [upload, { error, loading }] = useMutation(AvatarUpdateMutation);

	const onSelectImage = async (result: ImagePickerResult) => {
		if (result.cancelled === true) {
			return;
		}

		setSource({ uri: result.uri });
		if (onImageSelect) {
			onImageSelect(result);
		}

		try {
			await upload({
				update: AvatarUpdateMutationUpdateFn(props.id, props.type, BB),
				variables: {
					data: {
						id: props.id,
						image:
							Platform.OS === 'web'
								? result.uri
								: `data:image/jpeg;base64,${get(result, 'base64')}`,
					},
				},
			});
		} catch (error) {
			BB.Logger.error('Error while uploading Image', error);
		}
	};

	const showPicker = useCallback(() => {
		showImagePicker(onSelectImage, {
			cameraOptions: imagePickerOptions,
			libraryOptions: imagePickerOptions,
		});
	}, []);

	return (
		<React.Fragment>
			<AvatarSettingView
				{...imageView}
				source={source}
				loading={loading}
				error={error}
				onPress={showPicker}
				testID="AvatarSettingView"
			/>
		</React.Fragment>
	);
};
