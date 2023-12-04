import { combineReducers } from '@reduxjs/toolkit'
import { PersistConfig, persistReducer } from 'redux-persist'
import localForage from 'localforage'

const persistedReducers = {
 
}

const appReducer = combineReducers({
 
})

export type AppState = ReturnType<typeof appReducer>

const persistConfig: PersistConfig<AppState> = {
  key: 'interface',
  version: 2, // see migrations.ts for more details about this version
  storage: localForage.createInstance({
    name: 'redux',
  }),
  whitelist: Object.keys(persistedReducers),
  throttle: 1000, // ms
  serialize: false,
  // The typescript definitions are wrong - we need this to be false for unserialized storage to work.
  // We need unserialized storage for inspectable db entries for debugging.
}

const persistedReducer = persistReducer(persistConfig, appReducer)

export default persistedReducer
