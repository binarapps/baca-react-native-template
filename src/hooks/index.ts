// Reexport all the hooks that you use within the project here
// Hooks from external packages
export {
  useBottomSheet,
  useBottomSheetInternal,
  useBottomSheetModal,
  useBottomSheetSpringConfigs,
  useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet'
export { useAsyncStorage } from '@react-native-async-storage/async-storage'
export { useNetInfo } from '@react-native-community/netinfo'
export { useAssets } from 'expo-asset'
export { useFonts } from 'expo-font'
export { useURL } from 'expo-linking'
export { useAnimationState, useDynamicAnimation } from 'moti'
export { useTheme } from './useTheme'
export {
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
export {
  useController,
  useFieldArray,
  useForm,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form'
export { useSSR, useTranslation } from 'react-i18next'
export { useWindowDimensions } from 'react-native'
export { useNotificationController, useNotifications } from 'react-native-notificated'
export { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context'
export {
  useInfiniteQuery,
  useIsFetching,
  useIsMutating,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query'
export { useDebounce, useDebouncedCallback, useThrottledCallback } from 'use-debounce'

export * from './forms'
export * from './navigation'

// Custom hooks implemented in app
export * from './useAppStateActive'
export * from './useBoolean'
export * from './useCachedResources'
export * from './useKeyboardHeight'
export * from './useSafeAreaInsetsStyle'
export * from './useSecurePassword'
export * from './useToggle'
