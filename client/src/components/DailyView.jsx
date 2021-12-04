import React, { useEffect, useState } from 'react';
import { ReactAgenda, Modal, ReactAgendaCtrl } from 'react-agenda';
import Rdate from 'react-datetime';
import moment from 'moment';

const now = new Date();

const DailyView = ({ userItems, colors, closeModal, showModal, addNewEvent, wakeTime, closePlannerModal, showPlannerModal }) => {
  const [items, setItems] = useState(userItems);
  const [selected, setSelected] = useState(now);
  const [newEvents, setNewEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [startDateTime, setStartDateTime] = useState(selected);
  const [endDateTime, setEndDateTime] = useState(moment(startDateTime).add(30, 'Minutes')['_d']);
  const [color, setColor] = useState([]);


  const handleCellSelection = (cell) => {
    setSelected([cell]);
    setStartDateTime(new Date(cell));
    setEndDateTime(moment(cell).add(30, 'Minutes')['_d'])
  }

  const handleItemEdit = (item) => {
    console.log('handleItemEdit', item)
  }

  const handleDateRangeChange = () => {
    setSelected([]);
  }

  const handleDateChange = () => {

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
  }

  let itc = Object.keys(colors)
  let colorsElement = itc.map((item, idx) => {
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
        <form onSubmit={handleSubmit}>
          <div className="agendCtrls-label-wrapper">
            <div className="agendCtrls-label-inline">
              <label>Event name</label>
              <input type="text" autoFocus name="name" className="agendCtrls-event-input" value={eventName} onChange={handleNameChange} placeholder="Event Name" />
            </div>
            <div className="agendCtrls-label-inline">
              <label>Color</label>
              <div className="agendCtrls-radio-wrapper">
                {colorsElement}</div>
            </div>
          </div>
          <div className="agendCtrls-timePicker-wrapper">
            <div className="agendCtrls-time-picker">
              <label >Start Date</label>
              <Rdate value={startDateTime} onChange={handleDateChange('startDateTime')} input={false} viewMode="time" ></Rdate>
            </div>
            <div className="agendCtrls-time-picker">
              <label >End Date</label>
              <Rdate value={endDateTime} onChange={handleDateChange('endDateTime')} input={false} viewMode="time" ></Rdate>
            </div>
          </div>
          <button onClick></button>
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