import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  font-family: Arial, sans-serif;
`;

export const Heading = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

export const Label = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
`;

export const Select = styled.select`
  padding: 10px;
  margin: 10px 0;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
`;

export const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const RecaptchaContainer = styled.div`
  margin-top: 10px;
`;
