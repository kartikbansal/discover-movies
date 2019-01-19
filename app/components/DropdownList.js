import React from 'react';
import DropdownListItem from './DropdownListItem';

const DropdownList = ({ itemsList, onItemSelect, onClick }) => (
  <div className="dropdown-list-container">
    <ul>
      {
        itemsList.length && 
        itemsList.map(item => 
          <DropdownListItem
            key={item.id} 
            item={item} 
            onSelect={() => {
              onItemSelect(item.id);
              onClick();
            }} 
          />
        )
      } 
    </ul>
  </div>
);

export default DropdownList;