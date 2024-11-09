import Link from 'next/link'

export default function Login() {
  return (
    <>
      <Link 
        href="/authentication/sign-up" 
        className='bg-primary px-3 py-2 rounded-3 text-white fw-bold text-decoration-none'
      >
        Login
      </Link>
    </>
  )
}
