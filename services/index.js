import {request, gql} from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async() =>{
    const query = gql `
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                name
                id
                photo {
                  url
                }
                aboutMe
              }
              createdAt
              link
              title
              quote
              featuredImage {
                url
              }
              categories {
                name
                link
              }
            }
          }
        }
      }`;
    const results = await request(graphqlAPI, query);
    return results.postsConnection.edges;
};

export const getPostDetails = async (link) => {
  const query = gql`
    query getPostDetails($link : String!) {
      post(where: {link: $link}) {
        title
        quote
        featuredImage {
          url
        }
        author{
          name
          aboutMe
          photo {
            url
          }
        }
        createdAt
        link
        content {
          raw
        }
        categories {
          name
          link
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { link });

  return result.post;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        link
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getSimilarPosts = async (categories, link) => {
  const query = gql`
    query GetPostDetails($link: String!, $categories: [String!]) {
      posts(
        where: {link_not: $link, AND: {categories_some: {link_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        link
      }
    }
  `;
  const result = await request(graphqlAPI, query, {link, categories});

  return result.posts;
};
export const getCategories = async () => {
  const query = gql`
    query GetCategories {
        categories {
          name
          link
        }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categories;
};

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (link) => {
  const query = gql`
    query GetComments($link:String!) {
      comments(where: {post: {link: $link}}){
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { link });
  return result.comments;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        link
        createdAt
      }
    }   
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};
export const getCategoryPost = async (link) => {
  const query = gql`
    query GetCategoryPost($link: String!) {
      postsConnection(where: {categories_some: {link: $link}}) {
        edges {
          cursor
          node {
            author {
              aboutMe
              name
              id
              photo {
                url
              }
            }
            createdAt
            link
            title
            quote
            featuredImage {
              url
            }
            categories {
              name
              link
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { link });

  return result.postsConnection.edges;
};