/**
 * Generated by orval 🍺
 * Do not edit manually.
 * API
 * API documentation for the starter-kit project in NestJS by BinarApps. The API allows management of users, sessions and offers various functions for logged in users. Contains examples of authentication, authorization, and CRUD for selected resources.
 * OpenAPI spec version: 1.0
 */
import type { CheckUpdateDtoOs } from './checkUpdateDtoOs'

export interface CheckUpdateDto {
  /** The operating system for which to check the update. Can be either "android" or "ios". */
  os: CheckUpdateDtoOs
  /** The current version of the app installed on the device. */
  currentVersion: string
}
