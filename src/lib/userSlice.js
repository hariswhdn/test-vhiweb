import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    users: [],
    user: {},
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
    setUser: (state, { payload }) => {
      state.loading = false
      state.user = payload
      state.error = null
    },
    setError: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export const fetchUsers = () => async (dispatch) => {
  await dispatch(setLoading(true))
  try {
    const response = await axios.get('https://reqres.in/api/users')
    await dispatch(setUsers(response.data.data))
  } catch (error) {
    await dispatch(setError(error.message))
  }
}

export const fetchUser = (id) => async (dispatch) => {
  await dispatch(setLoading(true))
  try {
    const response = await axios.get(`https://reqres.in/api/users/${id}`)
    await dispatch(setUser(response.data.data))
  } catch (error) {
    await dispatch(setError(error.message))
  }
}

export const { setLoading, setUsers, setUser, setError } = usersSlice.actions
export default usersSlice.reducer
