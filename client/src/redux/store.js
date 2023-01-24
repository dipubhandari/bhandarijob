import { configure, configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'

const store = configureStore({
    reducer: {

        isLogin: authSlice,

    }
})

export default store