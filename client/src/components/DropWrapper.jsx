import React from 'react'
import { useDrop } from 'react-dnd'
import { statuses } from '../data'
import ITEM_TYPE from '../data/types'


export const DropWrapper = ({onDrop, children, status}) => {
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item, monitor) => {
      onDrop(item, monitor, status)
    },
    canDrop: (item) => {
      const itemIndex = statuses.findIndex(statusIndex => statusIndex.status === item.status)
      const statusIndex = statuses.findIndex(statusIndex => statusIndex.status === status)

      return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })

  return (
    <div ref={drop} className="drop-wrapper"> 
      {React.cloneElement(children, { isOver })}
    </div>
  )
}
