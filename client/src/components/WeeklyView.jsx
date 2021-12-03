import React, { useEffect, useState } from 'react';
import { ReactAgenda , ReactAgendaCtrl , guid ,  Modal } from 'react-agenda';

const colors= {
  'color-1':"rgba(102, 195, 131 , 1)",
  "color-2":"rgba(242, 177, 52, 1)",
  "color-3":"rgba(235, 85, 59, 1)"
}

const now = new Date();

const DailyView = ({ userItems }) => {
  const [items, setItems] = useState(userItems);
  const [select, setSelected] = useState([]);
  const [wakeTime, setWakeTime] = useState([8, 22]);
  const [showModal, setShowModal] = useState(false);

  const handleCellSelection = (item) => {
    console.log('handleCellSelection',item)
  }

  const handleItemEdit = (item) => {
    console.log('handleItemEdit', item)
  }

  const handleRangeSelection = (item) => {
    console.log('handleRangeSelection', item)
  }


  return (
    <ReactAgenda
      minDate={now}
      maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
      disablePrevButton={false}
      startDate={new Date()}
      cellHeight={30}
      items={items}
      numberOfDays={7}
      rowsPerHour={4}
      itemColors={colors}
      fixedHeader={true}
      startAtTime={wakeTime[0]}
      endAtTime={wakeTime[1]}
      onItemEdit={handleItemEdit.bind(this)}
      onCellSelect={handleCellSelection.bind(this)}
      onRangeSelection={handleRangeSelection.bind(this)}
    />
  )
}

export default DailyView;