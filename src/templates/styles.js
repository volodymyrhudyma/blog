import styled from "styled-components"

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

export const SubTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const SearchWrapper = styled.div`
  position: relative;

  @media (max-width: 480px) {
    width: 100%;
  }
`

export const TOCWrapper = styled.div`
  cursor: pointer;
  font-weight: 600;
  outline: none;
  margin-right: 2rem;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`
