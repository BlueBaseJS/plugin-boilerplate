# CameraRollPermission

CameraRollPermission is the screen for Gallery Permission

## Usage

```jsx
<CameraRollPermission>
	<ComponentWhenPermissionIsThere />
</CameraRollPermission>
```

## Screenshots

| Web | Android |                                 IOS                                 |
| :-: | :-----: | :-----------------------------------------------------------------: |
|  ❌  |    ❌    | <img src="./screenshots/CameraRollPermissionIos.png" width="200" /> |

## Component Props

extends PermissionProps

## User Stories

|                                                               Story                                                               | In Storybook | Has Unit Test |
| :-------------------------------------------------------------------------------------------------------------------------------: | :----------: | :-----------: |
|                       User should be able to see ask permission view in case the permission is not available                      |       ✅      |       ✅       |
|                                     On clicking Grant button should show a confirmation dialog                                    |       ✅      |       ✅       |
| There should be an allow button there. On clicking allow button we should prompt user to give us the permission ask by the system |       ✅      |       ✅       |
|                                                                                                                                   |              |               |
