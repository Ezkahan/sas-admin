import { gql } from '@apollo/client'

export const GET_BANNER = gql`
query banner($id: ID!) {
    banner(id: $id)
        {
            id
            link
            image
            visited_count
            category_id
            position
        }
    }
`