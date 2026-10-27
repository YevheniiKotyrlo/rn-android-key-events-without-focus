# With `enableKeyEvents` on, Android delivers no key event to JS while no view has focus

`ReproducerApp/App.tsx` gives a root `View` an `onKeyDown` that shows the last key it received, above a `Pressable`.
`MainApplication.kt` turns the `enableKeyEvents` feature flag on after `loadReactNative`.

React Native 0.88.0, release build, Android 16 emulator (x86_64):

```sh
cd ReproducerApp
yarn install
cd android && ./gradlew assembleRelease -PreactNativeArchitectures=x86_64 && cd ..
adb install -r android/app/build/outputs/apk/release/app-release.apk
adb shell am start -W -n com.reproducerapp/.MainActivity
# tap "Tapped 0 times", then
adb shell input keyevent KEYCODE_ESCAPE   # expected "Last key: Escape"; seen "Last key: none"
adb shell input keyevent KEYCODE_TAB      # moves focus to the Pressable
adb shell input keyevent KEYCODE_ESCAPE   # now "Last key: Escape"
```

After the tap no view holds focus (`uiautomator dump` lists no focused node), and the key reaches no JS handler. Once
Tab has focused a view, the same key reaches the root's `onKeyDown`.
