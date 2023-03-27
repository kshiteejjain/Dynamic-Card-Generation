import { createSlice } from "@reduxjs/toolkit";

const initialState: any[] = []

const UserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload);
            localStorage.setItem('users', JSON.stringify(action.payload))
            console.log(action.payload);
        }
    }
});

export const {addUser} = UserSlice.actions;
export default UserSlice.reducer;