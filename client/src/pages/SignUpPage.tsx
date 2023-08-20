import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

export interface Validation {
  email: string;
  password: string;
}

const validation: Validation = {
  email: "",
  password: "",
};

const SignUpPage = () => {
  const [validationState, setValidationState] = useState(validation);
  const [validationErrors, setValidationErrors] = useState(validation);
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleInputChange = (key: keyof Validation, value: string) => {
    setValidationState({
      ...validationState,
      [key]: value,
    });
  };
  const validateForm = () => {
    const { email } = validationState;
    let errors: Validation = {
      email: "",
      password: "",
    };

    if (!validateEmail(email)) {
      errors = {
        ...errors,
        email: "유효한 이메일을 입력해주세요.",
      };
    }
    setValidationErrors(errors);
    const isValid = Object.values(errors).every((value) => value === "");

    return isValid;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signupMutation = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${url}/members/register`,
          validationState,
          {
            withCredentials: false,
          }
        );

        alert("회원가입이 완료되었습니다.");
        navigate("/login");
        return response.data;
      } catch (error) {
        console.log("에러입니다");
      }
    }
  };

  const handleInputKeyDown =
    (handleLogin: () => void) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleLogin();
      }
    };

  const handleSignup = () => {
    signupMutation();
  };

  return (
    <Container>
      <StyledForm onSubmit={handleSignup}>
        <LogoBox>
          <Logo>
            <Font>냉 파 고</Font>
            <SubFont>우리집 냉장고 파먹기 솔루션</SubFont>
          </Logo>
        </LogoBox>
        <StyledLoginDiv className="flex">
          <StyledInputWrapper>
            <StyledLoginInput
              type="text"
              placeholder="이메일을 입력하세요"
              value={validationState.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("email", e.target.value)
              }
              onKeyDown={handleInputKeyDown(handleSignup)}
            />
            {validationErrors.email && (
              <StyledErrorMessage>{validationErrors.email}</StyledErrorMessage>
            )}
          </StyledInputWrapper>
          <StyledInputWrapper>
            <StyledLoginInput
              type="password"
              placeholder="Password를 입력하세요"
              value={validationState.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("password", e.target.value)
              }
              onKeyDown={handleInputKeyDown(handleSignup)}
            />
            {validationErrors.password && (
              <StyledErrorMessage>
                {validationErrors.password}
              </StyledErrorMessage>
            )}
          </StyledInputWrapper>

          <StyledButton onClick={handleSignup}>회원가입</StyledButton>
        </StyledLoginDiv>
      </StyledForm>
    </Container>
  );
};

export default SignUpPage;

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(241, 241, 241, 0.5);
`;

const StyledLoginDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  border-radius: 5% 5% 0 0;
  width: 100%;
  height: 80%;
  padding: 30px;
  margin-bottom: 60px;
`;

const StyledLoginInput = styled.input`
  // 입력창
  width: 350px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #d6d9dc;
  padding: 4px;
`;

const StyledInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 50px;
  margin-bottom: 16px;
`;

const StyledForm = styled.form`
  background-color: rgba(209, 232, 238, 1);
  max-width: 420px;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 200px;
  height: 40px;
  border-radius: 8px;
  margin-top: 40px;
  background-color: #ffffff;
  border: 1px solid #d6d9dc;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #edeeef;
  }
`;

const StyledErrorMessage = styled.div`
  color: red;
  margin-top: 4px;
`;
const LogoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20%;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(245, 241, 233, 1);
  margin-bottom: 30px;
`;
const Font = styled.p`
  font-weight: bold;
  font-size: 30px;
  color: rgba(61, 80, 103, 1);
`;
const SubFont = styled.p`
  font-weight: bold;
  color: rgba(61, 80, 103, 1);
`;
