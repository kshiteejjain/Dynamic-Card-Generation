import { Action, configureStore, ThunkAction, combineReducers } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit'
import usersReducers from '../features/Form/FormSlice';
import profilePicReducer from '../features/ProfilePic/ProfilePicSlice';

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  users : usersReducers,
    imageList: profilePicReducer
})

export const setupStore: any = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type AppDispatch = typeof setupStore.dispatch;
export type RootState = ReturnType<typeof setupStore>;
export type AppStore = ReturnType<typeof setupStore>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
