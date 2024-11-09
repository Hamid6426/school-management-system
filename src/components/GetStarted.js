import Link from 'next/link'

export default function GetStarted() {
  return (
    <>
      <Link 
        href="/authentication/sign-up" 
        className='btn btn-primary px-3 py-1 text-white rounded-2 text-decoration-none'
      >
        Get Started
      </Link>
    </>
  )
}
