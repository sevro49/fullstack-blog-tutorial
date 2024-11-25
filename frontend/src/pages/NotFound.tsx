import { Icon } from '@iconify/react';
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section id='404' className='min-h-screen h-full w-full flex flex-col items-center justify-center gap-4'>
      <Icon icon="fluent:globe-error-24-regular" className='text-stone-600 text-8xl'/>
      <h2 className="text-6xl font-bold text-stone-600">404</h2>
      <h3 className="text-2xl font-semibold">Page Not Found</h3>
      <p className="">Sorry, the page you're looking for doesn't exist.</p>
      <Link to='/'>
        <Button className="bg-stone-600 hover:bg-stone-700 text-white border border-stone-600">Back to Home</Button>
      </Link>
    </section>
  )
}

export default NotFound