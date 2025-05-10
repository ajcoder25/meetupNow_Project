
import { useState } from 'react'
import logo from '../assets/logo.svg'
import useFetch from "../useFetch"
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



export default function Header ({search, setSearch, data, loading, error}){
  
         const location = useLocation()
      
         // check where you are 

         const isHomePage = location.pathname ==='/'
         const isEventPage = location.pathname.startsWith("/events/")


        const [selectOption, SetEvent] = useState("");
         
       function checkEvent (selectOption,search, data){

           let query = search.toLowerCase().trim()

             if(query){
                return data?.filter((event) => {
                        const nameMatch = event.eventName.toLowerCase().includes(query)
                        const tagMatch = event.eventTag.some((tag)=> tag.toLowerCase().includes(query))

                        return nameMatch || tagMatch
                })
            }
                else if(selectOption ==='Online' || selectOption ==='Offline'){

                        return data.filter((event) => event.status === selectOption)



                }
                else{
                        return data
                }
        

              
                   
             }

       
        

             const event = checkEvent(selectOption, search, data)

      
    return(
        <>
         <div className = 'container '>
        <div className = 'd-flex justify-content-between align-items-center'>
          
             <Link to ='/'>
               <img src = {logo} alt = "logo" className ='img-fluid bg-warning' style = {{maxWidth: "650px", height:"150px"}}  />
           
        </Link>
         
        {(isHomePage || isEventPage) && (
     <div className="position-relative mt-3">
     <input
       type="text"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      className="rounded-bottom border"
      placeholder=" 🔍︎ Search events..."
    />
  </div>
   )}


       </div>
         </div>

       {loading && (
        <div className = 'text-center flex-column d-flex justify-content-center  align-items-center'>

        <div className="spinner-border m-5" role="status">
        </div>
       
      <p className = 'text-center'>Loading</p>
    
       
     
     
       
      </div>
       )}
        
      
      
        
        {error && <p>Error Loading events</p>}

        <div>
        <div className="container ">
          <hr />

          {isHomePage && (
  <div className="d-flex justify-content-between mb-3">
    <div>
      <h2>Meetup Events</h2>
    </div>
    <div>
      <select
        onChange={(event) => SetEvent(event.target.value)}
        style={{ maxWidth: "175px" }}
        className="form-select border-0 shadow-sm rounded"
      >
        <option value="select Event Type">Select Event Type</option>
        <option value="Online">Online</option>
        <option value="Offline">Offline</option>
      </select>
    </div>
  </div>
)}

<div className="row row-cols-1 row-cols-md-3 g-5 rounded-4 border-0">
  {event?.length === 0 && (search || selectOption) && (
    <div className="text-center py-5  px-5 d-flex justify-content-center w-100" style = {{minWidth: '300px', minHeight: '300px'}}>
      <h4 className = ''>No events found</h4>
    </div>
  )}
  
  {event?.map((event, index) => (
    <div key={index || event._id} className="col ">

        <Link to = {`/events/${event._id}`} className = 'text-decoration-none '>
                <div className="card h-100 card-hover-effect shadow-sm position-relative">
                  <span
                    className="position-absolute top-0 start-0 bg-white text-black px-1 py-1 shadow rounded-2 ms-2 mt-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {event.status === "Online"
                      ? "Online Event"
                      : "Offline Event"}
                  </span>

                  <img
                    src={event.image}
                    className="card-img-top"
                    alt={event.eventName}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <p>{event.date}</p>
                    <h5 className="card-title">{event.eventName}</h5>
                  </div>
                </div>
         </Link>
              </div>
            ))}
           
          </div>
        </div>
      </div>


</>
    )
}
