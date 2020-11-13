import styled from "styled-components"

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4rem 0;

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
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 2.5rem;
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

export const TOCTag = styled.div`
  margin-bottom: 0.5rem;
  font-weight: bold;
`

export const TOCLink = styled.div`
  margin-bottom: 0.25rem;
`

export const TOCSectionList = styled.ul`
  margin: 0;
  display: flex;

  @media (max-width: 992px) {
    display: block;
  }
`

export const TOCSectionListItem = styled.li`
  list-style: none;
  flex: 1;

  &:not(:last-child) {
    margin-right: 2rem;

    @media (max-width: 992px) {
      margin-right: 0;
    }
  }
`
