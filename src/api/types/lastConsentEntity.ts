/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Generated by orval 🍺
 * Do not edit manually.
 * API
 * API documentation for the starter-kit project in NestJS by BinarApps. The API allows management of users, sessions and offers various functions for logged in users. Contains examples of authentication, authorization, and CRUD for selected resources.
 * OpenAPI spec version: 1.0
 */

export interface LastConsentEntity {
  /** The date and time when the consents were last created or the user agreed to the terms for the first time. */
  createdAt: string
  /** Whether the privacy policy was accepted. */
  privacyPolicyAccepted: boolean
  /** Version of privacy policy. */
  privacyPolicyVersion: string
  /** Whether the terms were accepted. */
  termsAccepted: boolean
  /** Version of terms. */
  termsVersion: string
  /** The date and time of the last update to the consents, indicating when the user last modified their agreement or the consents were refreshed. */
  updatedAt: string
}
