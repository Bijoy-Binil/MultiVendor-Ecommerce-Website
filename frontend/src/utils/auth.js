// Authentication utility functions

/**
 * Check if the user is logged in based on local storage and token validity
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');
  const isLoggedIn = localStorage.getItem('customer_login') === 'true';
  
  // Simple check for token existence and login status
  return !!token && isLoggedIn;
};

/**
 * Log out the user by removing all authentication data
 */
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('customer_login');
  localStorage.removeItem('customer_id');
  localStorage.removeItem('customer_username');
}; 