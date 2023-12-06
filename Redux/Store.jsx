import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './Slice'
import storage from 'redux-persist/lib/storage'
import {persistStore,persistReducer} from 'redux-persist'

const userPersistConfig = {
  key:'user',
  storage
}

const userPersistReducer = persistReducer(userPersistConfig,userReducer)
export const Store = configureStore({
  reducer: {
    user:userPersistReducer
  }
})

export const persistor = persistStore(Store)