/**
 * Generated by orval 🍺
 * Do not edit manually.
 * API
 * API documentation for the starter-kit project in NestJS by BinarApps. The API allows management of users, sessions and offers various functions for logged in users. Contains examples of authentication, authorization, and CRUD for selected resources.
 * OpenAPI spec version: 1.0
 */

export interface AuthUpdateDto {
  /** The first name of the user. */
  firstName?: string
  /** The last name of the user. */
  lastName?: string
  /** IETF language tags (e.g., en-US). */
  locale?: string
  /** The new password for updating user credentials. */
  password?: string
  /** The old password required for security verification when updating user credentials. */
  oldPassword?: string
}
