import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeNotification } from "../reducers/notificationReducer"

const Notification = ( { notification } ) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeNotification(notification.id))
    } , notification.duration || 3000)

    return () => clearTimeout(timer)
  },[])

  return(
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  )
}



const Notifications = () => {
  const notifications = useSelector(s => s.notifications)
  return (
    <div className="notifications-container" style={{opacity : '.5' , margin :'10px 0'}}>
      {notifications.map( notification => (
        <Notification key={notification.id} notification={{...notification}} />
      ))}
    </div>
  )
}

export default Notifications