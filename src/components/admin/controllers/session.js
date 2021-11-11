// check who loggedIn
export const WhoLoggedIn = (role,logout) => {
   if (role != 1) {
      logout()
   }
}