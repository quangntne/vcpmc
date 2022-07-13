import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	listPermission : []
}

const PermissionStore = createSlice({
	name: 'PermissionStore',
	initialState,
	reducers:{
		getListPermission: (state, action)=>{
			state.listPermission = action.payload.data;
			return state;
		}
	}
})

export default PermissionStore;
