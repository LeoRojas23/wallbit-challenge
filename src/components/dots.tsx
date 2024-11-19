import { cn } from '@/lib/utils'

const dots = 'mx-[1px] h-1.5 w-1.5 bg-[#09090b] rounded-full animate-bounce'

export default function Dots() {
  return (
    <div className='mx-2 inline-flex items-center'>
      <span className={cn(dots, '[animation-delay:-0.3s]')} />
      <span className={cn(dots, '[animation-delay:-0.15s]')} />
      <span className={cn(dots)} />
    </div>
  )
}
