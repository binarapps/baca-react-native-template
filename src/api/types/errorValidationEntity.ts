/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Generated by orval 🍺
 * Do not edit manually.
 * API
 * API documentation for the starter-kit project in NestJS by BinarApps. The API allows management of users, sessions and offers various functions for logged in users. Contains examples of authentication, authorization, and CRUD for selected resources.
 * OpenAPI spec version: 1.0
 */
import type { ErrorValidationEntityErrors } from './errorValidationEntityErrors'

export interface ErrorValidationEntity {
  /** Object containing field-specific validation errors */
  errors: ErrorValidationEntityErrors
  /** HTTP status code indicating the error */
  status: number
}
