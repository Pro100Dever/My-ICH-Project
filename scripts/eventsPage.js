import { eventsStore } from '../getEway/events.js'
const closeMapBtn = document.getElementById('closeMapBtn')
const allEventList = document.querySelector('.all-events__list')

renderAllEventsList()

function renderAllEventsList() {
  allEventList.innerHTML = ''
  eventsStore.forEach(el => {
    const date = renderDate(el.date).toUpperCase().split(' AT ').join(' · ')
    const listItem = document.createElement('li')
    listItem.classList.add('all-events__list-item')
    listItem.innerHTML = `
        <div class="all-events__img" style="background-image: url(${
          el.image
        }) ">
             ${
               el.type === 'online'
                 ? '<div class="all-events__online">Online Event</div>'
                 : ''
             }
        </div>
        <div class="all-events__text">
            <p class="all-events__date">${date ? date : 'Error date'}</p>
            <h3 class="all-events__list-title">
            ${el.title ? el.title : 'Error title'}
            </h3>
            <div class="all-events__location">${
              el.category ? el.category : 'Error location'
            } 
                ${el.distance ? `(${el.distance} km)` : ''}</div>
            
                ${
                  el.type === 'online'
                    ? '<div class="all-events__online all-events__online--mobile">Online Event</div>'
                    : ''
                }
            <div class="all-events__status">
                <div>${el.attendees ? `${el.attendees} attendees` : ''}</div>
            </div>
        </div>
    `
    allEventList.append(listItem)
  })
}
/* 
  {
    title: 'INFJ Personality Type - Coffee Shop Meet & Greet',
    description: 'Being an INFJ',
    date: new Date(2024, 2, 23, 15),
    image:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w ',
    type: 'offline',
    attendees: 99,
    category: 'Hobbies and Passions',
    distance: 50,
  },
*/

/* 
   <li class="all-events__list-item">
              <div class="all-events__img">
      <div class="all-events__online">Online Event</div>
    </div>
    <div class="all-events__text">
       <p class="all-events__date">Mon, Mar 18 · 7:00 PM PDT</p>
       <h3 class="all-events__list-title">
         Day Trading Idea and Strategy dzfgdfz hgdffdgdf gdfgd f dsfds
         f ddsf dssad sad
       </h3>
       <div class="all-events__location">Business (5 km)</div>
      <div class="all-events__online all-events__online--mobile">
         Online Event
      </div>
      <div class="all-events__status">
       <div>1 going</div>
     </div>
   </div>
 </li>
*/
// Отформатировка даты
function renderDate(date) {
  const eventDate = new Date(date)
  let options = {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    timezone: 'UTC',
    timeZoneName: 'short',
  }
  return eventDate.toLocaleString('en-US', options)
}
// Карта
closeMapBtn.addEventListener('click', () => {
  console.log('fdh')
  const closeMap = document.getElementById('blurMap')
  closeMap.style.display = 'none'
  closeMapBtn.style.display = 'none'
})
