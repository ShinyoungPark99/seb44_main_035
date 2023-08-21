import { Routes, Route } from "react-router-dom";
import RefridgePage from "./pages/RefridgePage";
import MainPage from "./pages/MainPage";
import WritePage from "./pages/WritePage";
import MyPage from "./pages/MyPage";
import MyWritePage from "./pages/MyWritePage";
import EditPage from "./pages/EditPage";
import RecipePage from "./pages/RecipePage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";
import BasketPage from "./pages/BasketPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MyPostPage from "./pages/MyPostPage";

export interface RecipeList {
  Recipes: {
    recipe_id: number;
    name: string;
    view: number;
    likes: number;
    img: string;
  };
}

function App() {
  function isLoggedIn() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    // console.log("isLoggedIn:", isLoggedIn);
    return isLoggedIn;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={isLoggedIn() ? <MainPage /> : <LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/create-recipe" element={<WritePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/my-writepage" element={<MyWritePage />} />
        <Route path="/create-recipe/:id" element={<EditPage />} />
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/recipes/:id" element={<DetailPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/recipes/search/:keyword" element={<SearchPage />} />
        <Route path="/refridge" element={<RefridgePage />} />
        <Route path="/my-recipes" element={<MyPostPage />} />
      </Routes>
    </>
  );
}

export default App;
