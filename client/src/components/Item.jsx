import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import ITEM_TYPE from '../data/types'

export const Item = ({item, index, moveItem, status}) => {
  const ref = useRef(null)
  const drop = useDrop({
    accept: ITEM_TYPE,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;
      
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex, item, status);
      item.index = hoverIndex;
    }
  })[1]

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { ...item, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  drag(drop(ref))
  return (
    <>
      <div
        ref={ref}
        style={{opacity: isDragging? 0 : 1}}
        className="item"
      >
        <div className="color-bar" style={{ backgroundColor: status.color }}></div>
        <p className="item-title">{item.content}</p>
        <p className="item-status">{item.icon}</p>
      </div>
    </>
  )
}
