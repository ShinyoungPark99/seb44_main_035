import styled from "styled-components";
import BottomNavBar from "../components/bottom/BottomNavBar";
import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { PostList } from "../types/types";
import { useNavigate, redirect } from "react-router-dom";

export default function MyPostPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<PostList[]>([]);
  const token = JSON.parse(sessionStorage.getItem("token") || "null") as {
    access: string;
    refresh: string;
  };

  useEffect(() => {
    const getPostList = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/members/find/recipe`;
        const headers = {
          Authorization: `Bearer ${token.access}`,
        };
        const res = await axios.get(url, { headers });
        setData(res.data.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getPostList();
  }, []);

  return (
    <>
      <Container>
        <AppBox>
          <Header>
            <BackButton />
            <span className="title">내가 작성한 레시피 📝</span>
          </Header>
          <ContentWrapper>
            {data.map((post: any) => (
              <>
                <Contents>
                  <Content>
                    {/* <div
                      key={index}
                      onClick={() => {
                        navigate(`/recipes/${post.recipeId}`);
                      }}
                    > */}
                    <ImgWrapper>
                      <img
                        onClick={() => {
                          navigate(`/recipes/${post.recipeId}`);
                        }}
                        className="recipeImg"
                        src={post.recipeImage}
                      />
                    </ImgWrapper>
                    <TextWrapper>
                      <TitleWrapper>
                        <div
                          onClick={() => {
                            navigate(`/recipes/${post.recipeId}`);
                          }}
                        >
                          {post.recipeName}
                        </div>
                      </TitleWrapper>
                      <ButtonWrapper>
                        <Button
                          onClick={() => {
                            navigate(`/create-recipe/${post.recipeId}`);
                          }}
                        >
                          수정
                        </Button>
                        <Button
                          onClick={async () => {
                            try {
                              const url = `${
                                import.meta.env.VITE_API_URL
                              }/recipes/delete/${post.recipeId}`;
                              const headers = {
                                Authorization: `Bearer ${token.access}`,
                              };

                              if (
                                window.confirm("게시글을 삭제하시겠습니까?")
                              ) {
                                axios.delete(url, { headers }).then((_res) => {
                                  alert("삭제되었습니다.");
                                  window.location.href = `/my-recipes`;
                                });
                              }
                            } catch (error) {
                              console.log("Error:", error);
                            }
                          }}
                        >
                          삭제
                        </Button>
                      </ButtonWrapper>
                    </TextWrapper>
                    {/* </div> */}
                  </Content>
                </Contents>
              </>
            ))}
          </ContentWrapper>
        </AppBox>
      </Container>
      <BottomNavBar />
    </>
  );
}

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(241, 241, 241, 0.5);
`;

const AppBox = styled.div`
  background-color: white;
  max-width: 420px;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: auto;
  padding-bottom: 60px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px;

  .title {
    font-size: 18px;
    margin-left: 100px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  background-color: rgb(238, 238, 238);
  box-shadow: 0.3px 3px 7px rgb(151, 151, 151);
  height: 180px;
  width: 90%;
  border-radius: 30px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  height: 180px;
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ImgWrapper = styled.span`
  .recipeImg {
    width: 190px;
    height: 150px;
    margin-right: 10px;
    object-fit: cover;
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 8px;
  }
`;

const TextWrapper = styled.span`
  display: flex;
  width: 40%;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const TitleWrapper = styled.span`
  font-size: 17px;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const ButtonWrapper = styled.span`
  display: flex;
  justify-content: right;
`;

const Button = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3px;
  width: 45px;
  height: 25px;
  font-size: 14px;
  background-color: rgb(100, 116, 138);
  color: white;
  border-radius: 11px;
  border: none;
  cursor: pointer;
`;
