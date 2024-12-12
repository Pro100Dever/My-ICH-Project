import { eventsStore } from '../getEway/events.js'
const closeMapBtn = document.getElementById('closeMapBtn')
const allEventList = document.querySelector('.all-events__list')
const filterContainer = document.querySelector('.all-events__filter')
const filtersArr = filterContainer.querySelectorAll('.all-events__filter-list')
const filterResetBtn = document.querySelector('.all-events__reset-filter')
renderAllEventsList()
const filterObj = {
  type: 'Any type',
  distance: 'Any distance',
  category: 'Any category',
  data: 'Any data',
}

// Сброс фильтров
filterResetBtn.addEventListener('click', e => {
  e.preventDefault()
  filterObj.type = 'Any type'
  filterObj.distance = 'Any distance'
  filterObj.category = 'Any category'
  filterObj.data = 'Any data'

  // Сбрасываем всё
  filtersArr.forEach(filter => {
    if (filter.closest('.all-events__reset-filter')) {
      return
    }
    const span = filter.querySelector('span')
    span.innerText = `Any ${filter.getAttribute('id')}`
    span.style.color = '#212121' // Возвращаем стандартный цвет текста
    filter.style.background = '#f6f7f8' // Возвращаем стандартный фон
  })

  // Удаляем объект из localStorage
  localStorage.removeItem('filters')
  renderAllEventsList()
})
// Сбор данных с фильтра и запись в Локал Стораге
filterContainer.querySelectorAll('ul').forEach(ul => {
  ul.addEventListener('click', e => {
    const filterList = e.target.closest('.all-events__filter-list')
    const value = e.target.getAttribute('value') // Получаем value
    const listTitle = filterList.querySelector('span')

    listTitle.innerText = value

    // просто красим кнопки
    if (!listTitle.innerText.split(' ').includes('Any')) {
      listTitle.style.color = '#fff'
      filterList.style.background = '#00798A'
    } else {
      listTitle.style.color = '#212121'
      filterList.style.background = '#f6f7f8'
    }

    // Обновляем объект фильтров
    if (filterList.classList.contains('all-events__filter-distance')) {
      filterObj.distance = value.split(' km').join('')
    } else if (filterList.classList.contains('all-events__filter-category')) {
      filterObj.category = value
    } else if (filterList.classList.contains('all-events__filter-type')) {
      filterObj.type = value.toLowerCase()
    } else if (filterList.classList.contains('all-events__filter-date')) {
      filterObj.data = value
    }
    // Сохраняем в localStorage
    localStorage.setItem('filters', JSON.stringify(filterObj))
    renderAllEventsList()
  })
})

function getFilterDatas(datas) {
  // Получаем фильтры из localStorage
  const filters = localStorage.getItem('filters')
    ? JSON.parse(localStorage.getItem('filters'))
    : ''

  if (filters) {
    // Фильтруем данные на основе фильтров
    console.log(datas[0].date)
    console.log(filters.data)
    const newDatas = datas
      .filter(
        element =>
          filters.type.toLowerCase() == 'Any type'.toLowerCase() ||
          filters.type.toLowerCase() == element.type.toLowerCase()
      )
      .filter(
        element =>
          filters.distance.toLowerCase() == 'Any distance'.toLowerCase() ||
          filters.distance >= +element.distance
      )
      .filter(
        element =>
          filters.category.toLowerCase() == 'any category' ||
          filters.category.toLowerCase() == element.category.toLowerCase()
      )

    console.log(newDatas)
    return newDatas
  } else {
    // Если фильтры отсутствуют, возвращаем все данные
    return datas
  }
}

// Евент лист рендер
function renderAllEventsList() {
  const datas = getFilterDatas(eventsStore)
  allEventList.innerHTML = ''
  datas.forEach(el => {
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
// Логика для открытия/закрытия списков
filtersArr.forEach(filter => {
  filter.addEventListener('click', e => {
    const filterList = e.currentTarget.closest('.all-events__filter-list')
    filterList.classList.toggle('aktive')
    if (e.target.closest('.all-events__reset-filter')) {
      return
    }
    filterList.classList.contains('aktive')
      ? (filter.querySelector('ul').style.display = 'block')
      : (filter.querySelector('ul').style.display = 'none')
  })
})
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

console.log(new Date())
