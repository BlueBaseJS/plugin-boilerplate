# ProgressiveImage

Show blur animation while loading an image.

## Usage

```jsx
<ProgressiveImage thumbnail="" source="" style={{}} placeholder="" blurRadius={8} />
```

## ScreenShots

|                             🌏 Web                             |                             📱 Android                            |                             📱 iOS                            |
| :------------------------------------------------------------: | :---------------------------------------------------------------: | :-----------------------------------------------------------: |
| <img src="./screenshots/ProgressiveImage_web.png" width=200 /> | <img src="./screenshots/ProgressiveImage_android.png" width=200/> | <img src="./screenshots/ProgressiveImage_ios.png" width=200/> |

## Component Props

|     Name    |    Type   | Default |                   Description                  |
| :---------: | :-------: | :-----: | :--------------------------------------------: |
|    style    | ViewStyle |         |  styles which will be applied on the component |
|  thumbnail  |   String  |         |    thumbnail image which show while loading    |
|    source   |   String  |         |         image which show after loading         |
| placeholder |   String  |         | placeholder which shows before thumbnail image |
|  blurRadius |   Number  |         |      control Thumbnail's pixelation scale      |

## User Stories

|                      Story                      | In Storybook | Has Unit Test |
| :---------------------------------------------: | :----------: | :-----------: |
| should render ProgressiveImage without crashing |       ✅      |       ✅       |
|          should render ProgressiveImage         |       ✅      |       ✅       |
