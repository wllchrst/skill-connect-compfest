export function getFirstTwoInitials(name: string): string {
  // Split the name by spaces, filter out any empty words
  const words = name.split(" ").filter((word) => word.length > 0);

  // Handle the case for one-word names
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase(); // Return the first letter of the word
  }

  // Otherwise, return the first two initials
  return words
    .slice(0, 2) // Take only the first two words
    .map((word) => word.charAt(0).toUpperCase()) // Get the first letter and convert to uppercase
    .join(""); // Join the initials into a single string
}
