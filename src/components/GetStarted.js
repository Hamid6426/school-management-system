import React from 'react'
import Link from 'next/link'

export default function GetStarted() {
  return (
    <div>
      <button className='bg-primary text-white px-4 py-2 rounded-3 border-0'>
        <Link href="/authentication/sign-up" className='h5 text-white text-weight-bold text-decoration-none'>
          Get Started
        </Link>
      </button>
    </div>
  )
}
