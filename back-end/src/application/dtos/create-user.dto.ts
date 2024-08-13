export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  profilePictureLink: string;
  description: string;
}

export function validateCreateUserDTO(dto: CreateUserDTO): string {
  const errors: string[] = [];

  // Validate name
  if (!dto.name || typeof dto.name !== 'string' || dto.name.length > 50) {
    errors.push(
      'Name must be a non-empty string with a maximum length of 50 characters.',
    );
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!dto.email || !emailRegex.test(dto.email)) {
    errors.push('Email must be a valid email address.');
  }

  // Validate password
  if (
    !dto.password ||
    typeof dto.password !== 'string' ||
    dto.password.length < 8
  ) {
    errors.push('Password must be a string with at least 8 characters.');
  }

  // Validate profilePictureLink
  const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
  if (!dto.profilePictureLink || !urlRegex.test(dto.profilePictureLink)) {
    errors.push('Profile picture link must be a valid URL.');
  }

  // Validate description (optional)
  if (
    dto.description &&
    (typeof dto.description !== 'string' || dto.description.length > 200)
  ) {
    errors.push(
      'Description must be a string with a maximum length of 200 characters.',
    );
  }

  return errors[0] ? errors[0] : '';
}
