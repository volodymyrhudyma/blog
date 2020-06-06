import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  padding: 3rem 2rem;
  background-color: #1ca086;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

export const Form = styled.form`
  margin: 0;
  display: flex;
  width: 23rem;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`

export const Input = styled.input`
  border: 0;
  outline: none;
  flex: auto;
  background-color: transparent;
  border-bottom: 1px solid #fff;
  color: #fff;
  padding: 0.5rem;

  ::-webkit-input-placeholder {
    color: #fff;
  }

  ::-moz-placeholder {
    color: #fff;
  }

  :-ms-input-placeholder {
    color: #fff;
  }

  :-moz-placeholder {
    color: #fff;
  }

  @media (max-width: 768px) {
    width: 17rem;
    margin: 0 auto 1rem auto;
    text-align: center;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`

export const Button = styled.button`
  border: 1px solid #fff;
  color: #fff;
  outline: none;
  background-color: transparent;
  margin-left: 1rem;
  cursor: pointer;
  padding: 0.25rem 2rem;

  @media (max-width: 768px) {
    margin: auto;
    width: 10rem;
    padding: 0.5rem 1rem;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`

export const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
  color: #fff;
  text-align: center;
`

export const SubTitle = styled.p`
  margin: 0;
  color: #fff;
  margin-bottom: 3rem;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`

export const SubscribeResponse = styled.div`
  position: absolute;
  bottom: -1.5rem;
  color: #fff;
  font-size: 0.75rem;
`
