import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import TimeAgo from 'react-timeago'
import Avatar from '../../components/Avatar'
import Post from '../../components/Post'
import { ADD_COMMENT } from '../../graphql/mutations'
import { GET_POST_BY_POST_ID } from '../../graphql/queries'

type FormData = {
  comment: string
}

function PostPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID],
  })
  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: router.query.postId,
    },
  })

  const post: Post = data?.getPostByPostId

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    // post comment
    console.log(formData)
    const notification = toast.loading('Posting comment...')

    await addComment({
      variables: {
        post_id: post.id,
        username: session?.user?.name,
        text: formData.comment,
      },
    })

    setValue('comment', '')

    toast.success('Comment posted!', {
      id: notification,
    })
  }

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} noHover />

      {post && (
        <>
          {session && (
            <div className="rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16 -mt-1 space-y-2">
              <p className="text-sm">
                Comment as{' '}
                <span className="text-red-500">{session?.user?.name}</span>
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col space-y-2"
              >
                <textarea
                  {...register('comment')}
                  className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
                  placeholder={
                    session ? 'Share your thougts' : 'Sign in to comment'
                  }
                />

                <button
                  type="submit"
                  className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200"
                >
                  Comment
                </button>
              </form>
            </div>
          )}

          <div className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 pl-10">
            <hr className="py-0 ml-4 w-full" />
            {post?.comments.map((comment) => (
              <div
                className="relative flex items-center space-x-2 space-y-5 pr-10"
                key={comment.id}
              >
                <hr className="absolute top-10 h-16 left-7 z-0 border" />
                <div className="z-50">
                  <Avatar seed={comment.username} />
                </div>

                <div className="flex flex-col">
                  <p className="py-2 text-xs text-gray-400">
                    <span className="font-semibold text-gray-600">
                      {comment.username}
                    </span>{' '}
                    • <TimeAgo date={comment.created_at} />
                  </p>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
export default PostPage
