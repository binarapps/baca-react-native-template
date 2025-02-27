/**
 * Generated by orval 🍺
 * Do not edit manually.
 * API
 * API documentation for the starter-kit project in NestJS by BinarApps. The API allows management of users, sessions and offers various functions for logged in users. Contains examples of authentication, authorization, and CRUD for selected resources.
 * OpenAPI spec version: 1.0
 */
import type { RoleDto } from './roleDto'
import type { StatusDto } from './statusDto'

export interface CreateUserDto {
  /** The email address of the user. */
  email: string
  /** The password for the user account. */
  password: string
  /** The first name of the user. */
  firstName: string
  /** The last name of the user. */
  lastName: string
  /** IETF language tags (e.g., en-US). */
  locale: string
  /** The role assigned to the user. */
  role: RoleDto
  /** The status of the user account. */
  status: StatusDto
}
