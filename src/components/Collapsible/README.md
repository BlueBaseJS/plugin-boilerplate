# Collapsible

A react native collapsible list component

## Usage

Basic Example

```jsx
<Collapsible title="Image">
	<Image source={{ uri: 'https://placeimg.com/500/500/any' }} style={{ height: 500 }} />
</Collapsible>
```

## ScreenShots

|                   Web                  |                     IOS                    |                     Android                    |
| :------------------------------------: | :----------------------------------------: | :--------------------------------------------: |
| ![web image](./screenshots/screen.png) | ![ios image](./screenshots/screen.ios.png) | ![web image](./screenshots/screen.android.png) |

## Component Props

|      Name      |          Type          | Default |                Description               | Required |
| :------------: | :--------------------: | :-----: | :--------------------------------------: | -------- |
|      title     |         string         |         |       Displays title of collapsible      | ✅        |
| TitleComponent |         string         |         |   Renders title component if available   | ❌        |
|      open      |         boolean        |   true  |         Toggles collapsible state        | ❌        |
|    children    |     React.ReactNode    |         |                                          | ❌        |
|  onChangeState | `(value: any) => void` |         | Function triggered when state is changed | ❌        |

## User Stories

|  Story | In Storybook | Has Unit Test |
| :----: | :----------: | :-----------: |
|  open  |       ✅      |       ✅       |
| closed |       ✅      |       ✅       |

```

```
