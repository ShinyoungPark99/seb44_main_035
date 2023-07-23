import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { RecipeList } from "../App";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import SearchBar from "../components/recipe/SearchBar";
import CreateButton from "../components/recipe/CreateButton";

type ingreListType = {
  ingredientId: number;
  ingredientName: string;
  quantity: number;
};

export default function RefridgePage() {
  //장바구니에 재료 없는 경우, 냉장고 속 재료 하나라도 있으면 뿌려주기
  //재료 추가 (post) 후에 메인에서 다시 get해서 냉장고에 있는 재료를 담아오는 방식 ...
  //냉장고에 담긴 재료 = ingreList (post) -> 유저 아이디랑 같이 가져오기

  // http://localhost:8080/recipes/find/main?ingredients=양파&ingredients=마늘

  const [ingreList, setIngreList] = useState<ingreListType[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    const getRefridgeIngre = async () => {
      //냉장고에 담긴 재료 조회
      try {
        const headers = {
          "ngrok-skip-browser-warning": "true",
        };
        const url = `https://port-0-seb44-main-035-rt92alkaxb0vy.sel4.cloudtype.app/ingres/1`;
        const response = await axios.get(url, { headers });
        const data = response.data.data;
        setIngreList(() => [...data]);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getRefridgeIngre();
  }, []);

  const ingredientName = [];
  for (let data of ingreList) {
    ingredientName.push(data.ingredientName);
  }

  // 배열로 재료 이름 뽑힘 ex) [양파, 마늘, 당근]
  const queryStr = ingredientName
    .map((item: any) => `ingredients=${item}&`)
    .join("")
    .slice(0, -1);
  // const queryStr = ingres.join("").slice(0, -1);
  // const url = BASE_URL + `recipes/find/main?${queryStr}`;
  // console.log(url);

  const [data, setData] = useState<RecipeList[]>([]);
  const getData = async () => {
    try {
      const url = BASE_URL + "recipes/find/main?" + queryStr;
      const res = await axios.get(url);
      console.log(res.data);
      setData(res.data.data);
    } catch (error) {
      console.log("에러입니다");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Container>
        {/* {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong</p>}
      {recipes && ( */}
        <AppBox>
          <Header>
            <BackButton />
            <SearchBar />
          </Header>
          <TitleWrapper>
            <div className="recipesTitle">냉장고 속 재료로 요리하기👩🏻‍🍳</div>
            <CreateButton />
          </TitleWrapper>

          <ul>
            <Wrapper>
              {data.map((recipe: any, index: number) => (
                <>
                  <Component>
                    <li
                      key={index}
                      onClick={() => {
                        navigate(`/recipes/${recipe.recipeId}`);
                      }}
                    >
                      <img
                        className="img"
                        alt="recipeImg"
                        src={recipe.recipeImage}
                      />
                      <div className="name">{recipe.recipeName}</div>
                    </li>
                  </Component>
                </>
              ))}
            </Wrapper>
          </ul>
        </AppBox>
      </Container>
    </>
  );
}

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(241, 241, 241, 0.5);
`;

const AppBox = styled.div`
  background-color: white;
  max-width: 420px;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
`;

const TitleWrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
  .recipesTitle {
    color: grey;
    font-size: 20px;
    text-align: center;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px;
`;

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Component = styled.div`
  width: 100%;
  padding: 10px;
  cursor: pointer;
  :hover {
    scale: 1.05;
  }

  .img {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
`;
