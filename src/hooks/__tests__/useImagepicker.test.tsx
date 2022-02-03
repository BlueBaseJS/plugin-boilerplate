/* eslint-disable max-len */

const mockAlert = jest.fn();
jest.mock('../../components/Alert', () => ({
	useAlert: () => ({ alert: mockAlert }),
}));

const mockShowActionSheet = jest.fn();
jest.mock('../../components/ActionSheet', () => ({
	useActionSheet: () => ({ showActionSheetOrDialogWithOptions: mockShowActionSheet }),
}));

const mockAskCameraPermission = jest.fn();
const mockAskCameraRollPermission = jest.fn();

async function mockAskPermission(p: string) {
	if (p === 'camera') {
		mockAskCameraPermission();
	}
	if (p === 'cameraRoll') {
		mockAskCameraRollPermission();
	}
}

const mockUsePermissions = jest.fn();

jest.mock('@blueeast/client-plugin-permissions-ui', () => {
	// const actual = jest.requireActual('@blueeast/client-plugin-permissions-ui');

	return {
		// ...actual,
		usePermissions: mockUsePermissions,
	};
});

jest.mock('expo-image-picker', () => ({
	MediaTypeOptions: { image: '' },
	launchCameraAsync: jest.fn(),
	launchImageLibraryAsync: jest.fn(),
}));

import { launchCameraAsync, launchImageLibraryAsync } from 'expo-image-picker';

import { BlueBaseApp } from '@bluebase/core';
import { Button } from 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import { useImagePicker } from '../useImagePicker';
import { waitForElement } from 'enzyme-async-helpers';

const ImagePicker = (_props: any) => {
	const showImagePicker = useImagePicker();
	return <Button title="Image Picker" onPress={showImagePicker as any} />;
};

describe('useImagePicker', () => {
	beforeEach(() => {
		mockAlert.mockReset();
		mockUsePermissions.mockReset();
		mockShowActionSheet.mockReset();
		mockAskCameraPermission.mockReset();
		mockAskCameraRollPermission.mockReset();
		// eslint-disable-next-line no-unused-expressions
		(launchImageLibraryAsync as jest.Mock).mockReset();
		(launchCameraAsync as jest.Mock).mockReset();
	});

	it('should show image picker and then launch image library when permission is granted', async () => {
		mockUsePermissions.mockReturnValue([{ status: 'granted' }, mockAskPermission]);
		const onImageSelect = jest.fn();

		const wrapper = mount(
			<BlueBaseApp>
				<ImagePicker />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ImagePicker);

		const showImagePicker: any = await wrapper.find('Button').prop('onPress');

		// show image picker
		showImagePicker(onImageSelect);
		expect(mockShowActionSheet).toHaveBeenCalledTimes(1);

		// launchImageLibrary fn
		const actionSheetCallback: any = mockShowActionSheet.mock.calls[0][1];
		actionSheetCallback(0);

		actionSheetCallback(1);
		expect(mockAskCameraRollPermission).toHaveBeenCalledTimes(0);
		expect(launchImageLibraryAsync).toBeCalledTimes(0);

		wrapper.unmount();
	});

	it('should show image picker and then launch image library when permission is granted', async () => {
		mockUsePermissions.mockReturnValue([{ status: 'Not granted' }, mockAskPermission]);
		const onImageSelect = jest.fn();

		const wrapper = mount(
			<BlueBaseApp>
				<ImagePicker />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ImagePicker);

		const showImagePicker: any = await wrapper.find('Button').prop('onPress');

		// show image picker
		showImagePicker(onImageSelect);
		expect(mockShowActionSheet).toHaveBeenCalledTimes(1);

		// launchImageLibrary fn
		const actionSheetCallback: any = mockShowActionSheet.mock.calls[0][1];
		actionSheetCallback(0);

		actionSheetCallback(1);
		expect(mockAskCameraRollPermission).toHaveBeenCalledTimes(0);
		expect(launchImageLibraryAsync).toBeCalledTimes(0);

		wrapper.unmount();
	});

	// tslint:disable-next-line: max-line-length
	it('should first ask permission and then show image picker and then launch image library when permission is undetermined', async () => {
		mockUsePermissions.mockReturnValue([
			{ status: 'undetermined' },
			async () => {
				throw Error('throwing to kill infinite loop');
			},
		]);
		const onImageSelect = jest.fn();

		const wrapper = mount(
			<BlueBaseApp>
				<ImagePicker />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ImagePicker);

		const showImagePicker: any = await wrapper.find('Button').prop('onPress');

		// show image picker
		showImagePicker(onImageSelect);
		expect(mockShowActionSheet).toHaveBeenCalledTimes(1);

		// launchImageLibrary fn
		const actionSheetCallback: any = mockShowActionSheet.mock.calls[0][1];
		actionSheetCallback(0);

		expect(mockAskCameraRollPermission).toHaveBeenCalledTimes(0);

		wrapper.unmount();
	});
	it('should first ask permission and then show image picker and then launch image library when permission is undetermined', async () => {
		jest.mock('react-native/Libraries/Utilities/Platform', () => {
			return {
				// ...jest.requireActual('react-native/Libraries/Utilities/Platform'),
				OS: 'web',
			};
		});

		mockUsePermissions.mockReturnValue([
			{ status: 'undetermined' },
			async () => {
				throw Error('throwing to kill infinite loop');
			},
		]);
		const onImageSelect = jest.fn();

		const wrapper = mount(
			<BlueBaseApp>
				<ImagePicker />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ImagePicker);

		const showImagePicker: any = await wrapper.find('Button').prop('onPress');

		// show image picker
		showImagePicker(onImageSelect);
		expect(mockShowActionSheet).toHaveBeenCalledTimes(0);

		// launchImageLibrary fn

		expect(mockAskCameraRollPermission).toHaveBeenCalledTimes(0);

		wrapper.unmount();
	});
});
