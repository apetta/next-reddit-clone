import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://dongtai.stepzen.net/api/brawny-goose/__graphql', // can be env variable
  headers: {
    Authorization: `ApiKey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
  },
  cache: new InMemoryCache(),
})

export default client
