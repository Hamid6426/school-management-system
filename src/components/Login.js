import Link from 'next/link'

export default function GetStarted() {
  return (
    <>
      <Link 
        href="/authentication/login" 
        className='btn btn-primary px-3 py-1 text-white rounded-2 text-decoration-none'
      >
        Login
      </Link>
    </>
  )
}
