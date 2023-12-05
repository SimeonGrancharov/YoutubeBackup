import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '../reducers/root'
import createSagaMiddleware from '@redux-saga/core'
import rootSaga from '../sagas/root'

const saga = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(saga as any)
})

saga.run(rootSaga)
