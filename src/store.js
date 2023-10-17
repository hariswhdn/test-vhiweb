import { configureStore } from '@reduxjs/toolkit'

import usersSlice from './lib/userSlice'

export default configureStore({
  reducer: {
    users: usersSlice,
  },
})
