import React, { useEffect, useState } from 'react';
import { guid, Modal } from 'react-agenda';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DailyView from './DailyView.jsx';
import WeeklyView from './WeeklyView.jsx';
import quotes from '../quotes.json';


const colors = {
  'color-1':"rgba(102, 195, 131 , 1)",
  'color-2':"rgba(242, 177, 52, 1)",
  'color-3':"rgba(235, 85, 59, 1)"
}

const now = new Date();

let userItems = [
  {
   _id: guid(),
    name: 'Apply to jobs',
    startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
    classes: 'color-1'
  },
  {
   _id: guid(),
    name: 'Lunch',
    startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
    endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 0),
    classes: 'color-2 color-3'
  },
  {
    _id: guid(),
     name: 'Apply to jobs',
     startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 0),
     endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0),
     classes: 'color-3'
   }
];

const remainingSlotCalc = (wakeTime) => {
  let remainingSlots = [wakeTime[1] - 1];
  let lastSlot = remainingSlots[(remainingSlots.length - 1)];

  while (lastSlot !== wakeTime[0]) {
    remainingSlots.push(lastSlot - 1);
    lastSlot = remainingSlots[(remainingSlots.length - 1)]
  }

  let usedSlots = [];

  userItems.forEach(event => {
    let startTime = event.startDateTime.getHours();
    let endTime = event.endDateTime.getHours();
    if (startTime > wakeTime[0] && startTime < wakeTime[1]) {
      usedSlots.push(startTime);
      if (endTime - startTime > 1) {
        for (let i = startTime + 1; i < endTime; i++) {
          usedSlots.push(i);
        }
      }
    }
  });

  remainingSlots = remainingSlots.filter(time => !usedSlots.includes(time));
  return remainingSlots;
};

const agendaPopulater = (wakeTime, newEvents) => {
  let remainingSlots = remainingSlotCalc(wakeTime);
  let newEventObjs = [];

  newEvents.forEach(event => {
    let startTime = remainingSlots.pop();
    let endTime;

    let startDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startTime, 0);
    let endDateTime;
    for (let i = 0; i < event.hours; i++) {
      endTime = remainingSlots[remainingSlots.length - 1];
      if (i === event.hours - 1) {
        endDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endTime, 0);
      } else {
        remainingSlots.pop();
      }
    }

    let newEventObj = {
      _id: event._id,
      name: event.name,
      startDateTime,
      endDateTime,
      classes: event.classes
    };
    newEventObjs.push(newEventObj);
  });
  userItems = userItems.concat(newEventObjs);
};

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [wakeTime, setWakeTime] = useState([9, 22]);
  const [showWakeModal, setWakeModal] = useState(false);
  const [wakeSelect, setWakeSelect] = useState(wakeTime[0]);
  const [sleepSelect, setSleepSelect] = useState(wakeTime[1]);
  const [showPlannerModal, setPlannerModal] = useState(false);

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

  const openWakeModal = () => {
    setWakeModal(true);
  }

  const closeWakeModal = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setWakeModal(false);
  }

  const openPlannerModal = () => {
    setPlannerModal(true);
  }

  const closePlannerModal = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setPlannerModal(false);
  }

  const addNewEvent = (items, newItems) => {
    closeModal();
  }

  const handleWakeChange = (e) => {
    setWakeSelect(Number(e.target.value));
  }

  const handleSleepChange = (e) => {
    setSleepSelect(Number(e.target.value));
  }

  const handleSetWakeTime = (e) => {
    e.preventDefault();
    setWakeTime([wakeSelect, sleepSelect]);
    closeWakeModal();
  }

  const daily =
    <div className='day-container daily-view'>
      <DailyView
        userItems={userItems}
        colors={colors}
        closeModal={closeModal}
        showModal={showModal}
        addNewEvent={addNewEvent}
        wakeTime={wakeTime}
        openPlannerModal={openPlannerModal}
        closePlannerModal={closePlannerModal}
        showPlannerModal={showPlannerModal}
        agendaPopulater={agendaPopulater}
      />
    </div>

  const weekly =
    <div className='week-container weekly-view'>
      <WeeklyView
        userItems={userItems}
        colors={colors}
      />
    </div>

  const [view, setView] = useState('daily');
  const selectedView = view === 'daily' ? daily : weekly;

  return (
    <div>
      {
        showWakeModal ?
        <Modal clickOutside={() => closeWakeModal()} >
            <Form onSubmit={handleSetWakeTime}>
              <Form.Group className="mb-3" controlId="formWakeTime">
                <Form.Label>Wake time: </Form.Label>
                <select value={wakeSelect} onChange={handleWakeChange}>
                  <option value="0">12:00 AM</option>
                  <option value="1">1:00 AM</option>
                  <option value="2">2:00 AM</option>
                  <option value="3">3:00 AM</option>
                  <option value="4">4:00 AM</option>
                  <option value="5">5:00 AM</option>
                  <option value="6">6:00 AM</option>
                  <option value="7">7:00 AM</option>
                  <option value="8">8:00 AM</option>
                  <option value="9">9:00 AM</option>
                  <option value="10">10:00 AM</option>
                  <option value="11">11:00 AM</option>
                  <option value="12">12:00 PM</option>
                  <option value="13">1:00 PM</option>
                  <option value="14">2:00 PM</option>
                  <option value="15">3:00 PM</option>
                  <option value="16">4:00 PM</option>
                  <option value="17">5:00 PM</option>
                  <option value="18">6:00 PM</option>
                  <option value="19">7:00 PM</option>
                  <option value="20">8:00 PM</option>
                  <option value="21">9:00 PM</option>
                  <option value="22">10:00 PM</option>
                  <option value="23">11:00 PM</option>
                </select>
                <br/>
                <Form.Text className="text-muted">
                  The time your day starts.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSleepTime">
                <Form.Label>Sleep time: </Form.Label>
                <select value={sleepSelect} onChange={handleSleepChange}>
                  <option value="0">12:00 AM</option>
                  <option value="1">1:00 AM</option>
                  <option value="2">2:00 AM</option>
                  <option value="3">3:00 AM</option>
                  <option value="4">4:00 AM</option>
                  <option value="5">5:00 AM</option>
                  <option value="6">6:00 AM</option>
                  <option value="7">7:00 AM</option>
                  <option value="8">8:00 AM</option>
                  <option value="9">9:00 AM</option>
                  <option value="10">10:00 AM</option>
                  <option value="11">11:00 AM</option>
                  <option value="12">12:00 PM</option>
                  <option value="13">1:00 PM</option>
                  <option value="14">2:00 PM</option>
                  <option value="15">3:00 PM</option>
                  <option value="16">4:00 PM</option>
                  <option value="17">5:00 PM</option>
                  <option value="18">6:00 PM</option>
                  <option value="19">7:00 PM</option>
                  <option value="20">8:00 PM</option>
                  <option value="21">9:00 PM</option>
                  <option value="22">10:00 PM</option>
                  <option value="23">11:00 PM</option>
                </select>
                <br/>
                <Form.Text className="text-muted">
                  The time your day ends.
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
        </Modal> : ''
      }
      <h4 className='quote'> {quotes[Math.floor(Math.random() * 41)]} </h4>
      <div className={view === 'daily' ? 'buttons' : 'weekly-buttons'}>
        <div className='view-buttons'>
          <button className='button' type='button' value='daily' onClick={(e) => handleViewChange(e)}>
            Daily
          </button>
          <button className='button' type='button' value='weekly' onClick={(e) => handleViewChange(e)}>
            Weekly
          </button>
        </div>
        <div className='planner-buttons'>
          <button className='button' type='button' onClick={openModal}>
            Add
          </button>
          <button className='button' type='button' onClick={openPlannerModal}>
            Auto-plan
          </button>
          <button className='button' type='button' onClick={openWakeModal}>
            Set Wake Time
          </button>
        </div>
      </div>
      {selectedView}
    </div>
  )
}

export default App;