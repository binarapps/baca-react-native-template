/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Generated by orval 🍺
 * Do not edit manually.
 * API
 * API documentation for the starter-kit project in NestJS by BinarApps. The API allows management of users, sessions and offers various functions for logged in users. Contains examples of authentication, authorization, and CRUD for selected resources.
 * OpenAPI spec version: 1.0
 */
import type { RoleId } from './roleId'
import type { RoleName } from './roleName'

export interface Role {
  /** Role ID, where 1 is for User and 2 is for Admin */
  id: RoleId
  /** Role name, which can be either user or admin */
  name: RoleName
}