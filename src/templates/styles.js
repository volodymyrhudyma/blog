import styled, { css } from "styled-components"

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

export const PageInfo = styled.div`
  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`
