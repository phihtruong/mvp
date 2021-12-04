import React, { useEffect, useState } from 'react';
import { ReactAgenda, Modal, ReactAgendaCtrl, guid } from 'react-agenda';
import Rdate from 'react-datetime';

const now = new Date();

const DailyView = ({ userItems, colors, closeModal, showModal, addNewEvent, wakeTime, openPlannerModal, closePlannerModal, showPlannerModal, agendaPopulater }) => {
  const [items, setItems] = useState(userItems);
  const [selected, setSelected] = useState(now);
  const [newEvents, setNewEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [color, setColor] = useState('color-1');
  const [taskHours, setTaskHours] = useState(1);

  useEffect(() => {
    setItems(userItems);
  }, [userItems]);
  const handleCellSelection = (cell) => {
    setSelected([cell]);
  }

  const handleItemEdit = (item) => {
    console.log('handleItemEdit', item)
  }

  const handleDateRangeChange = () => {
    setSelected([]);
  }

  const handleHourChange = (e) => {
    setTaskHours(e.target.value);
  }

  const handleNameChange = (e) => {
    setEventName(e.target.value);
  }

  const handleChange = (e) => {
    e.preventDefault();

    setColor(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEvents.length < 1) {
      return alert('Please add at least one event');
    }

    let newItems = agendaPopulater(wakeTime, newEvents)
    let oldItems = items;
    newItems = oldItems.concat(newItems);
    // setItems([...newItems]);

    setNewEvents([]);
    closePlannerModal();
  }

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (eventName.length < 1) {
      return alert('Please enter an event name');
    }

    let list = newEvents;
    list.push({
      _id: guid(),
      name: eventName,
      hours: taskHours,
      classes: color
    });

    setNewEvents([...list]);
    setEventName('');
    setTaskHours(1);
  }

  let itc = Object.keys(colors)
  let colorElements = itc.map((item, idx) => {
    return <div style={{ background: colors[item] }}
      className="agendCtrls-radio-buttons" key={item}>
      <button
        name="classes"
        value={item}
        className={color === item ? 'agendCtrls-radio-button--checked' : 'agendCtrls-radio-button'}
        onClick={handleChange}
      />
    </div>
  })

  const plannerModal =
    <Modal clickOutside={() => closePlannerModal()} >
      <div className="agendCtrls-wrapper">
        <ul className="events-list">
          New Events:
          {
            newEvents.map((event, i) => {
              return (
                <li key={i}>
                  {event.name}
                </li>
              )
            })
          }
        </ul>
        <form onSubmit={handleSubmit}>
          <div className="agendCtrls-label-wrapper">
            <div className="agendCtrls-label-inline">
              <label>Event name</label>
              <input type="text" autoFocus name="name" className="agendCtrls-event-input" value={eventName} onChange={handleNameChange} placeholder="Event name" />
            </div>
            <div className="agendCtrls-label-inline">
              <label>Color</label>
              <div className="agendCtrls-radio-wrapper">
                {colorElements}</div>
            </div>
          </div>
          <div className="agendCtrls-label-wrapper">
            <div className="agendCtrls-label-inline">
              <label>Hours</label>
              <input type="text" autoFocus name="hours" className="agendCtrls-event-input" value={taskHours} onChange={handleHourChange} placeholder="Task length" />
            </div>
          </div>
          <button type="reset" onClick={handleCreateEvent}>+</button>
          <br/>
          <input type="submit" value="Populate" />
        </form>
      </div>
    </Modal>

  return (
    <div>
      <ReactAgenda
        minDate={now}
        maxDate={new Date(now.getFullYear(), now.getMonth() + 3)}
        disablePrevButton={false}
        startDate={new Date()}
        cellHeight={30}
        items={items}
        numberOfDays={1}
        rowsPerHour={4}
        itemColors={colors}
        fixedHeader={true}
        startAtTime={wakeTime[0]}
        endAtTime={wakeTime[1]}
        onItemEdit={handleItemEdit}
        onCellSelect={handleCellSelection}
        // onDateRangeChange={handleDateRangeChange}
        onItemRemove={() => removeEvent()}
      />
      {
        showModal ? <Modal clickOutside={() => closeModal()} >
          <div className="modal-content">
            <ReactAgendaCtrl items={items} itemColors={colors} selectedCells={selected} Addnew={() => addNewEvent()} />

          </div>
        </Modal> : ''
      }
      {
        showPlannerModal ? plannerModal : ''
      }
    </div>
  )
}

export default DailyView;