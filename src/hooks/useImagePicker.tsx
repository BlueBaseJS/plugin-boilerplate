/* istanbul ignore file */
import * as Permissions from 'expo-permissions';

import {
	ImagePickerOptions,
	ImagePickerResult,
	launchCameraAsync,
	launchImageLibraryAsync,
} from 'expo-image-picker';

import { Icon } from '@bluebase/components';
import { Platform } from 'react-native';
import React from 'react';
import { useActionSheet } from '../components/ActionSheet';
import { useAlert } from '../components/Alert';

export interface UseImagePickerOptions {
	title?: string;
	message?: string;
}

export interface ShowImagePickerOptions {
	cameraOptions?: ImagePickerOptions;
	libraryOptions?: ImagePickerOptions;
}

export type onImageSelectFn = (result: ImagePickerResult) => void;

export function useImagePicker(options?: UseImagePickerOptions) {
	const { title, message }: UseImagePickerOptions = { title: 'Select Picture', ...options };

	const { alert } = useAlert();
	const { showActionSheetOrDialogWithOptions } = useActionSheet();
	async function askCameraPermission() {
		return await Permissions.askAsync('camera', 'cameraRoll');
	}
	async function launchCamera(onImageSelect: onImageSelectFn, opts: ShowImagePickerOptions) {
		const { cameraOptions } = opts;
		const { status, canAskAgain } = await Permissions.askAsync('camera', 'cameraRoll');
		if (status === 'granted') {
			const result = await launchCameraAsync(cameraOptions);
			onImageSelect(result);
		} else if (canAskAgain) {
			await askCameraPermission();
			launchCamera(onImageSelect, opts);
		} else {
			alert('Camera Permission denied!');
		}
	}

	async function launchImageLibrary(onImageSelect: onImageSelectFn, opts: ShowImagePickerOptions) {
		const { libraryOptions } = opts;
		const { status } = await Permissions.askAsync('camera', 'cameraRoll');

		if (status === 'granted') {
			const result = await launchImageLibraryAsync(libraryOptions);
			onImageSelect(result);
		} else if (status === 'undetermined') {
			await askCameraPermission();
			launchImageLibrary(onImageSelect, opts);
		} else {
			alert('Camera Roll Permission denied!');
		}
	}

	async function show(onImageSelect: onImageSelectFn, opts: ShowImagePickerOptions = {}) {
		const { libraryOptions } = opts;

		// On web we don't need any permissions as such
		if (Platform.OS === 'web') {
			const result = await launchImageLibraryAsync(libraryOptions);
			onImageSelect(result);
			return;
		}

		showActionSheetOrDialogWithOptions(
			{
				cancelButtonIndex: 2,
				icons: [
					<Icon name="image" key="library" />,
					<Icon name="camera" key="camera" />,
					<Icon name="cancel" key="cancel" />,
				],
				message,
				options: ['Select from Library', 'Select from Camera', 'Cancel'],
				showSeparators: true,
				title,
			},
			(index: number | undefined) => {
				if (index === 0) {
					launchImageLibrary(onImageSelect, opts);
				} else if (index === 1) {
					launchCamera(onImageSelect, opts);
				}
			}
		);
	}

	return show;
}
