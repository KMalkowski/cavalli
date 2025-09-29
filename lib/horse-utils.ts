/**
 * Utility functions for horse-related operations
 */

/**
 * Get CSS classes for gender badge based on horse gender
 * @param gender - The gender of the horse
 * @returns CSS classes string for the badge
 */
export const getGenderBadgeClasses = (gender: string) => {
  switch (gender.toLowerCase()) {
    case 'ogier':
      return 'bg-blue-500 text-white border-blue-500'
    case 'klacz':
      return 'bg-pink-500 text-white border-pink-500'
    case 'wałach':
      return 'bg-gray-200 text-gray-800 border-gray-300'
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200'
  }
}
