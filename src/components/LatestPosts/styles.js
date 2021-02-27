import styled, { css } from "styled-components"
import { Link } from "gatsby"

export const Wrapper = styled.div`
  margin-top: 2rem;
`

export const WrapperTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  @media (max-width: 568px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const SectionHeading = styled.h2`
  margin: 0;
  padding: 0;

  @media (max-width: 568px) {
    margin-bottom: 1rem;
  }
`

export const PostsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const PostInner = styled.div`
  padding: 1rem;

  ${({ backgroundColor }) =>
    backgroundColor &&
    css`
      background-color: ${backgroundColor};
    `}
`

export const PostBox = styled(Link)`
  border: 1px solid #d6d6d6;
  width: calc((100% - 3rem) / 4);
  display: flex;
  flex-direction: column;
  color: initial;

  &:nth-child(-n + 3) {
    margin-right: 1rem;
  }

  @media (max-width: 992px) {
    width: calc((100% - 1rem) / 2);

    &:nth-child(-n + 3) {
      margin-right: 0;
    }

    &:nth-child(-n + 2) {
      margin-bottom: 1rem;
    }

    &:nth-child(odd) {
      margin-right: 1rem;
    }
  }

  @media (max-width: 468px) {
    width: 100%;

    &:nth-child(-n + 2) {
      margin-bottom: 0;
    }

    &:nth-child(odd) {
      margin-right: 0;
    }

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`
export const PostImage = styled.div`
  width: 100%;
  background: url(${props => props.image});
  background-size: cover;
  height: 0;
  padding-top: 56.25%;
`

export const PostTitle = styled.h3`
  margin: 0 0 1rem 0;
`

export const PostDate = styled.div`
  font-size: 0.75rem;
  margin-right: 0.5rem;
`

export const PostTag = styled.div`
  display: inline-block;
  font-size: 0.75rem;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`

export const PostTop = styled.div`
  display: flex;
  align-items: center;
  flex: auto;
  display: flex;
  align-items: flex-end;
`

export const PostTeaser = styled.div`
  font-size: 0.85rem;
  flex: auto;
  display: flex;
  align-items: flex-end;
`

export const SearchWrapper = styled.div`
  position: relative;

  @media (max-width: 480px) {
    width: 100%;
  }
`
