const Notification = ({ message, error }) => {

  const className = `message ${error ? 'error' : 'succesfully'}` 
  if (message === null) {
      return null
    }
  
    return (
      <div className={className}>
        {message}
      </div>
    )
}

export default Notification