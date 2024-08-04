import React from 'react'
import PropTypes from 'prop-types'
import { Button } from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({title='Task Tracker', onAdd, showAdd}) => {

  const location=useLocation();
  return (
    <header className='header'>
        <h1 >{title} </h1> 
        {location.pathname==='/' && <Button color={showAdd?'red':'green'} 
        onClick={ onAdd}
         text={showAdd? 'Close':'Add'} 
         />  }
    </header>
  )
}



Header.prototype ={
    title : PropTypes.string.isRequired,
}

//CSS In JS
/* const headingStyle={
    color : 'red ' , 
    backgroundColor : 'black '
} */

export default Header