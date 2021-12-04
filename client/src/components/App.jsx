import React, { useEffect, useState } from 'react';
import { guid, Modal } from 'react-agenda';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
     name: 'LeetCode',
     startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 0),
     endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0),
     classes: 'color-3'
   }
];

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [wakeTime, setWakeTime] = useState([8, 22]);
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
    <div className='day-container'>
      <DailyView
        userItems={userItems}
        colors={colors}
        openModal={openModal}
        closeModal={closeModal}
        showModal={showModal}
        addNewEvent={addNewEvent}
        wakeTime={wakeTime}
        openPlannerModal={openPlannerModal}
        closePlannerModal={closePlannerModal}
        showPlannerModal={showPlannerModal}
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
        <button onClick={openWakeModal}>
          Set Wake Time
        </button>
        <button onClick={openPlannerModal}>
          Auto-planner
        </button>
      </div>
      {selectedView}
    </div>
  )
}

export default App;