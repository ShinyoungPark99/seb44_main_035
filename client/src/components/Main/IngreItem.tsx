import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { FaXmark } from "react-icons/fa6";
import styled from "styled-components";
import { ingreItemAtom } from "../../atoms/atoms";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

/*IngreList 에서 전달 */
type IngreItemProps = {
  el: string;
  ingredientId: number;
};

const IngreItem: React.FC<IngreItemProps> = ({
  el, //ingredientName
  ingredientId,
}: IngreItemProps) => {
  const [ingreState, setIngreState] = useRecoilState(ingreItemAtom);
  const [isDeleteBtn, setIsDeleteBtn] = useState(true);
  const [clicked, setClicked] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDeleteBtn(false);
    setIngreState((ingreState) => ingreState.filter((item) => item !== el));
    e.stopPropagation();
    deleteIngredient();
  };

  const handleBtnChange = () => {
    setClicked(!clicked);
    if (!clicked) {
      setIngreState(() => [el, ...ingreState]);
    } else {
      setIngreState((ingreState) => ingreState.filter((item) => item !== el));
    }
  };
  useEffect(() => {
    const isClicked = ingreState.includes(el);
    setClicked(isClicked);
  }, [el, ingreState]);

  /* 삭제하는 통신 */
  const deleteIngredient = async () => {
    try {
      const headers = {
        "ngrok-skip-browser-warning": "true",
      };
      const url = BASE_URL + `ingres/delete/${ingredientId}/1`;
      await axios.delete(url, { headers });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    isDeleteBtn && (
      <>
        <IngreBtn
          onClick={handleBtnChange}
          style={{
            backgroundColor: clicked
              ? "rgba(134, 154, 177, 1)"
              : "rgba(238, 238, 238, 1)",
            color: clicked ? "white" : "black",
          }}
        >
          <Ingre>{el}</Ingre>
          <DeleteBtn onClick={handleDeleteClick}>
            <FaXmark />
          </DeleteBtn>
        </IngreBtn>
      </>
    )
  );
};

export default IngreItem;
const IngreBtn = styled.div`
  //상속하는 거 알아오기
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 18%;
  width: 80px;
  height: 85px;
`;
const Ingre = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-top: 25px;
`;

const DeleteBtn = styled.button`
  // 자식 버튼으로 만들기
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  background-color: rgba(198, 197, 197, 1);
  border-radius: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 80px;
  height: 29px;
  border: none;
`;
