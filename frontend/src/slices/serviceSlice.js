const initialServices = {
    services: []
}

export const serviceSlice = createSlice({
    name: 'services',
    initialState: initialServices,
    reducers: {
        getServicesReducer: (state = [], action) => { 
            state.services = action.payload
        }
    }
})