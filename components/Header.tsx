import Image from 'next/image'
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  UserCircleIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline'
import {
  HomeIcon,
  ChevronDownIcon,
  SearchIcon,
  MenuIcon,
} from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

function Header() {
  const { data: session } = useSession()

  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm items-center">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Link href="/">
          {/* Left */}
          <Image
            priority
            src="/reddit-logo-full.svg"
            alt="Reddit Logo"
            layout="fill"
            objectFit="contain"
          />
        </Link>
      </div>

      <div className="flex items-center mx-7 xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="hidden ml-2 lg:inline-flex flex-1">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* Search */}
      <form className="sm:flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 px-3 py-1 bg-gray-100 hidden">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 outline-none bg-transparent"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden></button>
      </form>

      {/* Right */}

      <div className="space-x-2 mx-5 hidden lg:inline-flex items-center">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>

      <div className="flex flex-1 justify-end sm:flex-initial">
        {/* Sign in / Sign out */}
        <div
          onClick={() => (session ? signOut() : signIn())}
          className="items-center flex space-x-2 border border-gray-100 p-2 cursor-pointer ml-2"
        >
          <UserCircleIcon className="h-5 w-5 flex-shrink-0 text-gray-500" />
          <p className="text-gray-400 truncate">
            {session ? session?.user?.name : 'Sign In'}
          </p>
          {session && <ChevronDownIcon className="h-5 w-5 text-gray-400" />}
        </div>
        <div className="px-4 flex items-center lg:hidden justify-center">
          <MenuIcon className=" icon" />
        </div>
      </div>
    </div>
  )
}
export default Header
