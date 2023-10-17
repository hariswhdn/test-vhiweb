import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    users: [],
    error: null,
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    setUsers: (state, { payload }) => {
      state.loading = false
      state.users = payload
      state.error = null
    },
    setError: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export const fetchUsers =
  ({ size }) =>
  async (dispatch) => {
    await dispatch(setLoading(true))
    try {
      const response = await axios.get(
        `https://random-data-api.com/api/v2/users?size=${size}`
      )
      await dispatch(setUsers(response.data))
    } catch (error) {
      await dispatch(setError(error.message))
    }
  }

export const { setLoading, setUsers, setError } = usersSlice.actions
export default usersSlice.reducer
