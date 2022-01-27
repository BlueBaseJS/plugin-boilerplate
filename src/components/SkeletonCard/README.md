# SkeletonCard

SkeletonCard is used to show loading state of a card.

## Usage

```jsx
<SkeletonCard />
```

## Screenshots

|                                    Web                                    |                                     IOS                                    |                                     Android                                    |
| :-----------------------------------------------------------------------: | :------------------------------------------------------------------------: | :----------------------------------------------------------------------------: |
| <img src="./screenshots/SkeletonCard-web.png" alt="drawing" width="180"/> | <img src="./screenshots/SkeletonCard-ios.png" alt="drawing" width="190" /> | <img src="./screenshots/SkeletonCard-android.png" alt="drawing" width="190" /> |

## Component Props

|  Name  |              Type             | Default |                      Description                      |
| :----: | :---------------------------: | :-----: | :---------------------------------------------------: |
|  width |             number            |   190   |          This will set width of SkeletonCard          |
|  style |     StyleProp\\<ViewStyle>    |         |               Style prop of SkeletonCard              |
| styles | Partial\\<SkeletonCardStyles> |         | These are used to set default styles of skeleton card |

## Component Style

|       Name      |     Type    |                      Description                     |
| :-------------: | :---------: | :--------------------------------------------------: |
|       root      |  ViewStyle  |           These styles are applied on root           |
|     content     | TextStyle ️ | These styles are applied on content of skeleton card |
|      title      | ViewStyle ️ |  These styles are applied on title of skeleton card  |
|    titleSize    |  ViewStyle  |     These styles are applied for sizing of title     |
| descriptionSize |  ViewStyle  |  These styles are applied for sizing of description  |

## User Stories

|                 Story                 | In Storybook | Has Unit Test |
| :-----------------------------------: | :----------: | :-----------: |
| PlaceCard Skeleton with default width |       ✅      |       ✅       |
|  'PlaceCard Skeleton with width props |       ✅      |       ✅       |
