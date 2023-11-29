import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const LandingLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-full w-full overflow-auto mx-auto bg-gradient-to-br from-sky-200 via-zinc-200 to-sky-200">
        {children}
        <Link href="https://git.cs.usask.ca/neg208/learning-hub">
          <Image
            src="/github.png"
            alt="Github"
            width={50}
            height={50}
            className="fixed bottom-5 left-5 h-10 w-10 overflow-clip z-50 ml-2"
          />
        </Link>
    </div>
  )
}

export default LandingLayout;