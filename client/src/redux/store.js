import { configure, configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import accountSlice from './accountSlice'

const store = configureStore({
    reducer: {

        isLogin: authSlice,
        account: accountSlice
    }
})

export default store