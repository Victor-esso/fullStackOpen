import { createSlice , current } from "@reduxjs/toolkit"

const getId = () => (100000000000 * Math.random()).toFixed(0)

const newNoti = (message, type = "success" , duration = 3000) => ({
    message , 
    type ,
    duration,
    id : getId()
})

const notificationSlice = createSlice({
    name : 'notifications',
    initialState : [],
    reducers : {
        newNotification ( state , action){
            const typeOfMessage = action.payload?.type || 'success'
            const duration = action.payload?.duration || 3000
            const newNotification = newNoti(action.payload.message , typeOfMessage , duration)
            return state.concat(newNotification)
        },

        removeNotification (state , action){
            
            return state.filter(n => n.id !== action.payload)
        },

        clearAllNotifications (state , action){
            return []
        }

    }
})
 
export const { newNotification , removeNotification , clearAllNotifications } = notificationSlice.actions

export default notificationSlice.reducer