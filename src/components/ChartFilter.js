import React from 'react'

const ChartFilter = ({ text, active, onClick }) => {
  return (
    <button onClick={onClick} className={`w-12 m-2 h-8 border-1 rounded-md flex items-center justify-center cursor-pointer ${active ? 'bg-red-600 border-red-700 text-gray-100': 'border-red-300 text-red-300'}`}>
        {text}
    </button>
  )
}

export default ChartFilter