import { Filter } from 'lucide-react'
import React from 'react'

type advencedButtonProps = {
    setShowfilterForm: (show: boolean) => void
}

const AdvencedButton = ({setShowfilterForm}: advencedButtonProps) =>  {
  return (
    <>
     <div className="w-full flex items-center justify-center mt-4 mb-4 xl:hidden">
  <button className="flex items-center gap-3 px-6 py-3 cursor-pointer bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 transition-transform transform hover:scale-105" onClick={() => setShowfilterForm(true)}>
    <span className="text-lg font-semibold">Advanced Filter</span>
    <Filter size={24} />
  </button>
</div></>
  )
}

export default AdvencedButton