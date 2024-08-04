
import PropTypes from 'prop-types'
export const Button = ({color='steelBlue',text,onClick}) => {
  return (
    <button style={{backgroundColor:color}} onClick={onClick} className='btn'>{text}</button>
  )
}



Button.prototype ={
color:PropTypes.string,
text:PropTypes.string,
onClick:PropTypes.func,
}