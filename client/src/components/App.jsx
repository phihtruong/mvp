import React, { useEffect, useState } from 'react';
import { guid } from 'react-agenda';
import DailyView from './DailyView.jsx';
import WeeklyView from './WeeklyView.jsx';

const now = new Date();

const userItems = [
  {
   _id: guid(),
    name: 'Meeting , dev staff!',
    startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 10),
    classes: 'color-1'
  },
  {
   _id: guid(),
    name: 'Working lunch , Holly',
    startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 0),
    endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0),
    classes: 'color-2 color-3'
  },
];

const App = () => {
  const daily =
    <div className='day-container'>
      <DailyView userItems={userItems}/>
    </div>
  const weekly =
    <div className='week-container'>
      <WeeklyView userItems={userItems}/>
    </div>
  const [view, setView] = useState('daily');

  const handleViewChange = (e) => {
    setView(e.target.value);
  }

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
      </div>
      {selectedView}
    </div>
  )
}

export default App;