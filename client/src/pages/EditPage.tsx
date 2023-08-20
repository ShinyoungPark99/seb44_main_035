import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Ingredient from "../components/edit/EditIngredient";
import CookingOrder from "../components/edit/EditCookingOrder";
// import Buttons from "../components/Write/Buttons";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { recipesStateAtom } from "../atoms/atoms";
import BottomNavBar from "../components/bottom/BottomNavBar";

const EditPage = () => {
  const [recipes, setRecipes] = useRecoilState(recipesStateAtom);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipeData();
  }, []);

  const fetchRecipeData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/recipes/find/${id}`
      );

      const recipeData = response.data.data;

      // 비동기 함수로 getRecipeImageData 호출하고, 반환된 Promise<File>을 처리합니다.
      const recipeImageFile = await getRecipeImageData(recipeData.recipeImage);
      const cookStepImageFiles = await getListRecipeImageData(
        recipeData.cookStepImage
      );

      setRecipes({
        recipeName: recipeData.recipeName,
        recipeImage: recipeImageFile,
        recipeIntro: recipeData.recipeIntro,
        ingredients: recipeData.ingredients,
        cookStepContent: recipeData.cookStepContent,
        cookStepImage: cookStepImageFiles,
      });
    } catch (error) {
      console.error("Error fetching recipe data:", error);
    }
  };
  //이미지 URL에 해당하는 이미지 데이터를 요청
  const getRecipeImageData = async (imageUrl: string) => {
    // 헤더 수정

    const response = await axios.get(imageUrl, {
      responseType: "blob",
    });
    return new File([response.data], "update.jpg", { type: "image/jpeg" });
  };

  const getListRecipeImageData = async (imageUrls: string[]) => {
    const imageRequests = imageUrls.map((imageUrl) =>
      axios.get(imageUrl, {
        responseType: "blob",
      })
    );
    const responses = await Promise.all(imageRequests);
    return responses.map(
      (response, index) =>
        new File([response.data], `update_${index}.jpg`, { type: "image/jpeg" })
    );
  };

  const handleRecipeNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // TODO recipeName
    updateRecipeName(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO recipeIntro
    updateRecipeIntro(event.target.value);
  };

  // TODO update recipeName
  const updateRecipeName = (newRecipeName: string) => {
    setRecipes((prevRecipes) => ({
      ...prevRecipes,
      recipeName: newRecipeName,
    }));
  };

  // TODO update recipeIntro
  const updateRecipeIntro = (newRecipeIntro: string) => {
    setRecipes((prevRecipes) => ({
      ...prevRecipes,
      recipeIntro: newRecipeIntro,
    }));
  };

  // TODO update image
  const updateRecipeImage = (newRecipeImage: File) => {
    setRecipes((prevRecipes) => ({
      ...prevRecipes,
      recipeImage: newRecipeImage,
    }));
  };

  const saveRecipeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateRecipeImage(file);
    }
  };
  // const token = JSON.parse(sessionStorage.getItem("token") || "null") as {
  //   access: string;
  //   refresh: string;
  // };

  /* TODO 상세 페이지에서 레시피 아이디 받아서 넣기 */
  const updateRecipe = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/recipes/update/${id}`;

      const formData = new FormData();
      // TODO send photo
      formData.append("recipeImage", recipes.recipeImage);

      // TODO send photo multi photo
      recipes.cookStepImage.forEach((file) => {
        formData.append("cookStepImage", file); // 동일한 키를 사용하여 파일들을 추가
      });

      const data = {
        recipeName: recipes.recipeName,
        recipeIntro: recipes.recipeIntro,
        ingredients: recipes.ingredients,
        cookStepContent: recipes.cookStepContent,
      };
      const json = JSON.stringify(data);
      const blob = new Blob([json], { type: "application/json" });
      formData.append("recipe", blob);

      const response = await axios.patch(url, formData);
      navigate(`/recipes/${id}`);
      console.log(response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <StyledWrapper>
        <AppBox>
          <Title>레시피 제목</Title>
          <TitleInput
            type="text"
            value={recipes.recipeName}
            name="title"
            placeholder="요리의 제목을 입력해 주세요."
            onChange={handleRecipeNameChange}
          ></TitleInput>
          <PhotoUpload>
            <form>
              <>
                <img src={URL.createObjectURL(recipes.recipeImage)} />
                <ImgLabel htmlFor="FoodImg">이미지 변경</ImgLabel>
              </>
              <ImgInput
                type="file"
                accept="image/*"
                id="FoodImg"
                onChange={saveRecipeImage}
              />
            </form>
          </PhotoUpload>
          <Title>요리 소개</Title>
          <IntroduceInput
            type="textarea"
            value={recipes.recipeIntro}
            name="food-intoduce"
            placeholder="이 레시피의 탄생 배경을 적어주세요."
            onChange={handleContentChange}
          ></IntroduceInput>
          <Ingredient />
          <CookingOrder />
          <BtnContainer>
            <SaveBtn onClick={updateRecipe}>저장하기</SaveBtn>
            <CancelBtn onClick={() => navigate(`/recipes/${id}`)}>
              취소하기
            </CancelBtn>
          </BtnContainer>
        </AppBox>
      </StyledWrapper>
      <BottomNavBar />
    </>
  );
};
export default EditPage;

const StyledWrapper = styled.main`
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
  padding-bottom: 60px;
  position: relative;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.div`
  background-color: rgba(217, 217, 217, 1);
  width: 100%;
  height: 37px;
  font-weight: bold;
  font-size: small;
  padding: 10px;
  padding-left: 20px;
`;

const TitleInput = styled.input`
  background-color: rgba(244, 243, 243, 1);
  width: 100%;
  height: 37px;
  padding: 10px;
  padding-left: 20px;
  border-style: none;
`;
const IntroduceInput = styled.input`
  background-color: rgba(244, 243, 243, 1);
  width: 100%;
  height: 70px;
  padding-left: 20px;
  border-style: none;
`;
const PhotoUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(165, 165, 165, 1);
  width: 100%;
  height: 200px;
  font-size: small;
  form {
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
const ImgInput = styled.input`
  display: none;
`;
const ImgLabel = styled.label`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 13px;
  color: #0095f6;
  display: inline-block;
  cursor: pointer;
`;
const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const SaveBtn = styled.button`
  width: 139px;
  height: 63px;
  border-radius: 20px;
  background-color: rgba(96, 150, 255, 1);
  color: white;
  margin-right: 15px;
`;
const CancelBtn = styled.button`
  width: 139px;
  height: 63px;
  border-radius: 20px;
  background-color: rgba(255, 118, 118, 1);
  color: white;
  margin-left: 15px;
`;
