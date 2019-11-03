# Balance

balance your life

## Tools

[React Native](https://facebook.github.io/react-native/)

[Firebase](https://firebase.google.com/)

[Reast Native Firebase](https://invertase.io/oss/react-native-firebase/)

[React Navigation](https://reactnavigation.org)

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

- Settings screen:
  - logout
  - reset categories
  - how to use
  - clear all data
- loading/startup screens
- hook up database security rules (video #6!)
- test offline
- test Android
- async storage? may be automatically handled

---

Minor Todos:

- EDIT CATEGORY SCREEN: scroll to icon location of one that is selected
- DAY SCREEN: fix location of month left and right buttons
- SELECT CATEGORY: organize category list with "Overall Category" - "Sub category" ?
- ENTIRE APP: currently hardcoded to USD/en-US
- FIREBASE: Check if really querying twice or if once is from cache
- TOASTS: Play sounds?
- ALL SCREENS: Change sold blue to blue gradient?

- helpful vids (Firebase dude #6), (React Context API)

## Notes

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
