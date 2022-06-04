import { useSession } from 'next-auth/react'
import Image from 'next/image'

type Props = {
  seed?: string
  large?: boolean
  sub?: boolean
}

function Avatar({ seed, large, sub = false }: Props) {
  const { data: session } = useSession()
  return (
    <div
      className={`relative h-10 w-10 overflow-hidden rounded-full border-gray-300 bg-white ${
        large && 'h-20 w-20'
      }`}
    >
      <Image
        objectFit="contain"
        layout="fill"
        src={`https://avatars.dicebear.com/api/${
          sub ? 'identicon' : 'bottts'
        }/${seed || session?.user?.name || 'default'}.svg`}
        alt="avatar"
      />
    </div>
  )
}
export default Avatar
