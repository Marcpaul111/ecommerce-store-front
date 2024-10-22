
import {Frown} from 'lucide-react'


 const NoResult = () => {
  return (
    <div className="flex flex-col  items-center justify-center w-full h-full text-neutral-500">
        <Frown className='h-12 w-12' />
       
       <h3 className='text-lg py-3'> No Results Found.</h3>
       
    </div>
  )
}


export default NoResult
