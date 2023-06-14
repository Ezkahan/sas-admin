import { gql } from '@apollo/client'

export const DELETE_BANNER= gql`mutation DeleteBanner($id: ID!) { deleteBanner(id: $id) }`