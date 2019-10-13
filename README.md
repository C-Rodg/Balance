# Balance

balance your life

## Libraries

[React Navigation](https://reactnavigation.org)

[Async-Storage](https://github.com/react-native-community/async-storage)

[React-Native-Vector-Icons](https://github.com/oblador/react-native-vector-icons)

## Startup

- iOS: react-native run-ios
- Android: react-native run-android

## Troubleshooting iOS

_Missing native dependencies (iOS):_

- cd ios && pod install

_No bundle URL found:_

- just wait for graph dependencies to load
- rm -rf ios/build/
- kill \$(lsof -t -i:8081)
- react-native run-ios

_Everything is broken (iOS):_

- watchman watch-del-all
- rm -rf node_modules && yarn install
- rm -rf /tmp/metro-bundler-cache-\*
- rm -rf /tmp/haste-map-react-native-packager-\*
- cd ios && pod install
- ?? attempt to build in xcode (will fail)
- cd .. && react-native run-ios

## Troubleshooting Android

_:app:installDebug failed_

- start up Android project
- go to AVD manager and run your virtual device

## TODO:

- add 'expenseTitle' to add expense page
- style month screen
- style budget screen
- style login and register screens
- style initializing & loading screen
- style and figure out settings screen
- hook up firestore database
- async storage
- add day touch slider to day screen

- store money in integers only and always / 100

## Screens

- Login
- Signup
- Initializing
- Day (Home)
- Budgets
- New Budget
- Month
- Add Expense
- Select Category
- Settings

## Contributors

[Curtis](https://curtisrodgers.com/)
