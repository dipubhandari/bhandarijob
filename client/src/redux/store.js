import { configure, configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import accountSlice from './accountSlice'
import searchKeysSlice from './searchKeysSlice'

const store = configureStore({
    reducer: {

        isLogin: authSlice,
        Account: accountSlice,
        search:searchKeysSlice
    }
})

export default store