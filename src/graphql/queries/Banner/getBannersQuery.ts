import { gql } from '@apollo/client'

export const GET_BANNERS = gql`
query banners($page: Int) {
    banners(first: 30, page: $page, orderBy: [{column: ID, order: DESC}])
    {
        data {
            id
            link
            image
            visited_count
            category_id
            position
        }
        paginatorInfo {
            count
            currentPage
            firstItem
            lastItem
            lastPage
            perPage
            total
            hasMorePages
        }
    }
}
`;