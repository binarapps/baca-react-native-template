/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Generated by orval 🍺
 * Do not edit manually.
 * API
 * API documentation for the starter-kit project in NestJS by BinarApps. The API allows management of users, sessions and offers various functions for logged in users. Contains examples of authentication, authorization, and CRUD for selected resources.
 * OpenAPI spec version: 1.0
 */
import type { RoleDto } from './roleDto'
import type { StatusDto } from './statusDto'

export interface UpdateUserDto {
  /** The updated email address of the user. */
  email?: string
  /** The updated first name of the user. */
  firstName?: string
  /** The updated hash associated with the user account. */
  hash: string
  /** The updated last name of the user. */
  lastName?: string
  /** IETF language tags (e.g., en-US). */
  locale?: string
  /** The updated password for the user account. */
  password?: string
  /** The provider associated with the user account. */
  provider: string
  /** The updated role assigned to the user. */
  role?: RoleDto
  /** The social ID associated with the user account. */
  socialId: string
  /** The updated status of the user account. */
  status?: StatusDto
}