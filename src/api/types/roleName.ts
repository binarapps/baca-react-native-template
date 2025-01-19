/**
 * Generated by orval 🍺
 * Do not edit manually.
 * API
 * API documentation for the starter-kit project in NestJS by BinarApps. The API allows management of users, sessions and offers various functions for logged in users. Contains examples of authentication, authorization, and CRUD for selected resources.
 * OpenAPI spec version: 1.0
 */

/**
 * Role name, which can be either user or admin
 */
export type RoleName = (typeof RoleName)[keyof typeof RoleName]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RoleName = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const
