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

- create for categories
- pass route data with expenses
- edit expenses
- delete expenses
- pass route data with categories
- edit categories
- delete custom categories
- add in checks for invalid inputs - login, category names, expenses, etc.
- - toast alerts?
- structure budgets state
- create budgets
- edit budgets
- delete budgets
- style and implement settings screen
- async storage? may be automatically handled
- database security rules (video #6!)

---

- DAY SCREEN: fix location of month left and right buttons
- SELECT CATEGORY: organize category list with "Overall Category" - "Sub category" ?
- ENTIRE APP: currently hardcoded to USD/en-US
- FIREBASE: Check if really querying twice or if once is from cache

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
