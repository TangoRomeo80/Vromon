const initialServices = {
    services: []
}

export const serviceSlice = createSlice({
    name: 'services',
    initialState: initialServices,
    reducers: {
        getServices: (state = [], action) => { 
            state.services = action.payload
        }
    }
})