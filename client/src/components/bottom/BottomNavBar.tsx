import { FaHome, FaRegListAlt, FaUserCircle, FaLock } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(241, 241, 241, 0.5);
`;

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  max-width: 420px;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: #d9d9d9;
  border-radius: 15px 15px 0 0;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #3d5067;
`;

const BottomNavBar = () => {
  const navigate = useNavigate();
  const nonMembers = sessionStorage.getItem("nonMembers"); //"true"
  // const [isLogin, _setIsLogin] = useState(false);

  return (
    <Container>
      <NavBarContainer>
        <NavButton onClick={() => navigate("/recipes")}>
          <FaRegListAlt />
          <p>Recipes</p>
        </NavButton>
        <NavButton onClick={() => navigate("/")}>
          <FaHome />
          <p>Home</p>
        </NavButton>
        {nonMembers === "true" ? (
          <NavButton onClick={() => navigate("/login")}>
            <FaLock />
            <p>Login</p>
          </NavButton>
        ) : (
          <NavButton onClick={() => navigate("/mypage")}>
            <FaUserCircle />
            <p>MyPage</p>
          </NavButton>
        )}
      </NavBarContainer>
    </Container>
  );
};

export default BottomNavBar;
