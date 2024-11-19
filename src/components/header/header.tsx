import FormHeader from './form-header'

export default async function Header({ cartId }: { cartId: string | undefined }) {
  return (
    <header className='flex w-full flex-col items-center justify-center gap-6'>
      <h1 className='text-3xl font-bold text-neutral-200'>Wallbit Challenge</h1>
      <FormHeader cartId={cartId} />
    </header>
  )
}
