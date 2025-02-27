/**
 * Generated by orval 🍺
 * Do not edit manually.
 * API
 * API documentation for the starter-kit project in NestJS by BinarApps. The API allows management of users, sessions and offers various functions for logged in users. Contains examples of authentication, authorization, and CRUD for selected resources.
 * OpenAPI spec version: 1.0
 */

export interface AppVersionStatusEntity {
  /** The latest version of the app available in the app store. */
  latestVersion: string
  /** The minimum version of the app that still functions correctly without mandatory updates. */
  minimumVersion: string
  /** Indicates whether an update is required to continue using the app. */
  updateRequired: boolean
  /** AppId of application in AppStore(AppStore Bundle ID) or PlayStore(Google Play Store app ID) */
  appId: string
  /** The current version of the app. */
  currentVersionReleaseDate: string
}
