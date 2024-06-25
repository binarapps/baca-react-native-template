// TODO: For some reason when using BottomSheetScrollView inside Bottom sheet modal the scrollView is rendering white space
// Could be connected to this: https://github.com/gorhom/react-native-bottom-sheet/issues/1524
// Could be connected to this: https://github.com/gorhom/react-native-bottom-sheet/issues/1760
// After upgrading bottom sheet library try changing the imports, maybe it will work as expected
// import { BottomSheetScrollView as ScrollView, BottomSheetFlashList as FlashList, BottomSheetSectionList as SectionList } from "@gorhom/bottom-sheet";
import { FlashList } from '@shopify/flash-list'
import { SectionList } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export const BottomSheetScrollView = ScrollView
export const BottomSheetFlashList = FlashList
export const BottomSheetSectionList = SectionList
