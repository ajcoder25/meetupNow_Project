
import { useParams } from "react-router-dom"
import useFetch from "../useFetch"
import Header from '../component/Header'
export default function EventData(){
       const {eventId} = useParams()
    const{data,loading,error} = useFetch("https://meetupnow-pro.onrender.com/v1/events")
  
   

    const findEvent = data?.find((data) => data._id === eventId)


    
    return(
      <>
       <Header search="" setSearch={() => {}} loading={loading} error={error} />
    <div className='container py-4'>
      {findEvent && (
        <div className='row d-flex justify-content-between'>
          {/* Left Section */}
          <div className='col-lg-6' style = {{maxWidth: '600px'}}>
            <h2>{findEvent.eventName}</h2>
            <p>
              <strong>Hosted By:</strong> {findEvent.speaker.name}
            </p>
            <div>
              <img className='img-fluid rounded' src={findEvent.image} alt={findEvent.eventName} />

              <h3 className='mt-3'>Details:</h3>
              <p>{findEvent.description}</p>

              <h3>Additional Information:</h3>
              <p><strong>Dress Code:</strong> {findEvent.dresscode}</p>
              <p><strong>Age Restrictions:</strong> {findEvent.ageRestriction}</p>

              <h3>Event Tags:</h3>
              <div className='d-flex flex-wrap'>
                {findEvent.eventTag.map((event, index) => (
                  <button key={index} type='button' className='btn btn-danger me-2 mb-2'>
                    {event}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className='col-lg-4 mt-5 '>
            <div className='mt-4 border rounded p-3 shadow-sm bg-light'>
              <div className='d-flex align-items-center mb-2'>
                <span className='me-2'>🕒</span>
                <div>
                  <div>{findEvent.date}</div>
                  <div>{findEvent.endTime}</div>
                </div>
              </div>
              <p>📍 {findEvent.location}</p>
              <p><strong>Price:</strong> ₹{findEvent.price}</p>
            </div>
            
            <div className = 'px-5 text-center shadow-sm bg-light card-hover-effect'>
            <h3 className = 'mt-4'>Speaker</h3>
              <img src = {findEvent.speaker.speakerImage} className = 'rounded-pill'/>
              <p><strong>{findEvent.speaker.name}</strong></p>
              <p>{findEvent.speaker.title}</p>


            </div>
           
              
           
          </div>
        </div>
      )}
    </div>
  </>
   
    )
   
}