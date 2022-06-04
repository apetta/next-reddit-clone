import { gql } from '@apollo/client'

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query getSubredditListByTopic($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`

export const GET_SUBREDDIT_WITH_LIMIT = gql`
  query getSubredditListLimit($limit: Int!) {
    getSubredditListLimit(limit: $limit) {
      id
      topic
      created_at
    }
  }
`

export const GET_POSTS = gql`
  query getPostList {
    getPostList {
      title
      username
      subreddit {
        topic
        created_at
        id
      }
      votes {
        created_at
        upvote
        username
        id
        post_id
      }
      comments {
        text
        username
        created_at
        id
        post_id
      }
      created_at
      id
      image
      subreddit_id
      body
    }
  }
`

export const GET_VOTES_BY_POST_ID = gql`
  query getVotesByPostId($post_id: ID!) {
    getVotesByPostId(post_id: $post_id) {
      id
      created_at
      post_id
      upvote
      username
    }
  }
`

export const GET_POST_BY_POST_ID = gql`
  query getPostByPostId($post_id: ID!) {
    getPostByPostId(post_id: $post_id) {
      title
      username
      subreddit {
        topic
        created_at
        id
      }
      votes {
        created_at
        upvote
        username
        id
        post_id
      }
      comments {
        text
        username
        created_at
        id
        post_id
      }
      created_at
      id
      image
      subreddit_id
      body
    }
  }
`

export const GET_POSTS_BY_TOPIC = gql`
  query getPostListByTopic($topic: String!) {
    getPostListByTopic(topic: $topic) {
      title
      username
      subreddit {
        topic
        created_at
        id
      }
      votes {
        created_at
        upvote
        username
        id
        post_id
      }
      comments {
        text
        username
        created_at
        id
        post_id
      }
      created_at
      id
      image
      subreddit_id
      body
    }
  }
`
