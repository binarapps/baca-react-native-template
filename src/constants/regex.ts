export const REGEX = {
  EMAIL: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g,
  // PASSWORD - minimum: at least 8 chars, 1 small letter, 1 big letter, 1 special char, 1 number
  REGISTRATION_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
} as const
