import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from '@heroicons/react/outline'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { Jelly } from '@uiball/loaders'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { GET_VOTES_BY_POST_ID } from '../graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_VOTE } from '../graphql/mutations'

type Props = {
  post: Post
  noHover?: boolean
}

function Post({ post, noHover = false }: Props) {
  const router = useRouter()
  const { data: session } = useSession()
  const [vote, setVote] = useState<boolean>()

  const { data, loading } = useQuery(GET_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  })

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_VOTES_BY_POST_ID],
  })

  const voteHandler = async (isUpvote: boolean) => {
    if (!session) {
      toast(`❗️ You must be logged in to vote`)
      return
    }

    if (vote && isUpvote) return
    if (vote === false && !isUpvote) return

    await addVote({
      variables: {
        post_id: post?.id,
        username: session?.user?.name,
        upvote: isUpvote,
      },
    })
  }

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId

    const vote = votes?.find(
      (vote) => vote.username === session?.user?.name
    )?.upvote

    setVote(vote)
  }, [data, session])

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId

    if (votes?.length === 0) return 0

    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? total + 1 : total - 1),
      0
    )

    if (displayNumber === 0) {
      return votes[0]?.upvote ? '1' : '-1'
    }

    return displayNumber
  }

  if (!post) {
    return (
      <div className="flex w-full items-center justify-center p-10">
        <Jelly size={50} color="#FF4501" />
      </div>
    )
  } else {
    return (
      <div
        className={`flex rounded-md border border-gray-300 bg-white shadow-sm ${
          !noHover && 'hover:border hover:border-gray-600'
        }`}
      >
        {/* Vote */}
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          <ArrowUpIcon
            onClick={() => voteHandler(true)}
            className={`cursor-pointer voteButtons hover:text-red-400 active:scale-125 transition-transform ease-out duration-150 ${
              vote && 'text-red-400'
            }`}
          />
          <p className="text-xs font-bold text-black">{displayVotes(data)}</p>
          <ArrowDownIcon
            onClick={() => voteHandler(false)}
            className={`cursor-pointer voteButtons hover:text-blue-400 active:scale-125 transition-transform ease-out duration-150 ${
              vote === false && 'text-blue-400'
            }`}
          />
        </div>
        {/* Main */}
        <Link href={`/post/${post.id}`}>
          <div
            className={`p-3 pb-1 flex-1 ${
              !router?.query?.postId && 'cursor-pointer'
            }`}
          >
            {/* Header */}
            <div className="flex items-center space-x-2">
              <Avatar seed={post.username} />
              <p className="text-xs text-gray-400">
                <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                  <span className="font-bold cursor-pointer text-black hover:text-blue-400 hover:underline">
                    r/{post.subreddit[0]?.topic}
                  </span>
                </Link>{' '}
                • Posted by u/
                {post.username} <TimeAgo date={post.created_at} />
              </p>
            </div>
            {/* Body */}
            <div className="py-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm font-light">{post.body}</p>
            </div>
            {/* Image */}
            <img className="w-full" src={post.image} alt="" />

            {/* Footer */}
            <div className="flex space-x-4 text-gray-400 whitespace-nowrap">
              <div className="postButtons">
                <ChatAltIcon className="h-6 w-6" />
                <p>{post.comments.length} Comments</p>
              </div>
              <div className="postButtons">
                <GiftIcon className="h-6 w-6 hidden sm:inline" />
                <p className="hidden sm:inline">Award</p>
              </div>
              <div className="postButtons hidden sm:inline-flex">
                <ShareIcon className="h-6 w-6" />
                <p className="hidden sm:inline">Share</p>
              </div>
              <div className="postButtons ">
                <BookmarkIcon className="h-6 w-6" />
                <p className="hidden sm:inline">Save</p>
              </div>
              <div className="postButtons">
                <DotsHorizontalIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}
export default Post
