import React, { useEffect, useState } from 'react';
import { guid } from 'react-agenda';
import DailyView from './DailyView.jsx';
import WeeklyView from './WeeklyView.jsx';


const colors = {
  'color-1':"rgba(102, 195, 131 , 1)",
  'color-2':"rgba(242, 177, 52, 1)",
  'color-3':"rgba(235, 85, 59, 1)"
}

const now = new Date();

let userItems = [
  {
   _id: guid(),
    name: 'Meeting, dev staff!',
    startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 10),
    classes: 'color-1'
  },
  {
   _id: guid(),
    name: 'Working lunch, Holly',
    startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 0),
    endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0),
    classes: 'color-2 color-3'
  },
];

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const handleViewChange = (e) => {
    setView(e.target.value);
  }

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setShowModal(false);
  }

  const addNewEvent = (items, newItems) => {
    closeModal();
  }

  const removeEvent = (items, item) => {
    userItems = items;
  }

  const daily =
    <div className='day-container'>
      <DailyView
        userItems={userItems}
        colors={colors}
        openModal={openModal}
        closeModal={closeModal}
        showModal={showModal}
        addNewEvent={addNewEvent}
        removeEvent={removeEvent}
      />
    </div>

  const weekly =
    <div className='week-container'>
      <WeeklyView
        userItems={userItems}
        colors={colors}
      />
    </div>

  const [view, setView] = useState('daily');
  const selectedView = view === 'daily' ? daily : weekly;

  return (
    <div>
      <div className='view-buttons'>
        <button value='daily' onClick={(e) => handleViewChange(e)}>
          Daily
        </button>
        <button value='weekly' onClick={(e) => handleViewChange(e)}>
          Weekly
        </button>
        <button onClick={openModal}>
          Add
        </button>
      </div>
      {selectedView}
    </div>
  )
}

export default App;