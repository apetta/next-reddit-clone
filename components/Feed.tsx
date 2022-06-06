import { useQuery } from '@apollo/client'
import { Jelly } from '@uiball/loaders'
import { GET_POSTS, GET_POSTS_BY_TOPIC } from '../graphql/queries'
import Post from './Post'

type Props = {
  subreddit?: string
}

function Feed({ subreddit }: Props) {
  const { data, error } = useQuery(
    !subreddit ? GET_POSTS : GET_POSTS_BY_TOPIC,
    !subreddit
      ? {}
      : {
          variables: {
            topic: subreddit,
          },
        }
  )

  const posts: Post[] = !subreddit
    ? data?.getPostList
    : data?.getPostListByTopic

  if (!posts) {
    return (
      <div className="flex w-full items-center justify-center p-10">
        <Jelly size={50} color="#FF4501" />
      </div>
    )
  }

  return (
    <div className="mt-5 mx-auto space-y-4">
      {posts.map((post, i) => (
        <Post key={i} post={post} />
      ))}
    </div>
  )
}
export default Feed
