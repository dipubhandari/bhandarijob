import { configure, configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import accountSlice from './accountSlice'
import searchKeysSlice from './searchKeysSlice'
import applySlice from './applySlice'
import jobIdSclice from './jobIdSlice'
import chatSlice from './chatSlice'

const store = configureStore({



    reducer: {
        chat: chatSlice,
        isLogin: authSlice,
        Account: accountSlice,
        search: searchKeysSlice,
        apply: applySlice,
        jobId: jobIdSclice
    }
})

export default store