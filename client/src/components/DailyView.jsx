import React, { useEffect, useState } from 'react';
import { ReactAgenda, Modal, ReactAgendaCtrl } from 'react-agenda';

const now = new Date();

const DailyView = ({ userItems, colors, openModal, closeModal, showModal, addNewEvent, removeEvent, wakeTime }) => {
  const [items, setItems] = useState(userItems);
  const [selected, setSelected] = useState([]);


  const handleCellSelection = (cell) => {
    setSelected([cell]);
  }

  const handleItemEdit = (item) => {
    console.log('handleItemEdit', item)
  }

  const handleRangeSelection = (item) => {
    console.log('handleRangeSelection', item)
  }


  return (
    <div>
      <ReactAgenda
        minDate={now}
        maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
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
        // onRangeSelection={(handleRangeSelection.bind(this))}
        onItemRemove={() => removeEvent()}
      />
      {
        showModal ? <Modal clickOutside={() => closeModal()} >
          <div className="modal-content">
            <ReactAgendaCtrl items={items} itemColors={colors} selectedCells={selected} Addnew={() => addNewEvent()}/>

          </div>
        </Modal> : ''
      }
    </div>

  )
}

export default DailyView;