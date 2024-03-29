// 메뉴의 타입을 검사하는 함수
// itemType에 존재하는 object값이면 true를 반환한다.
export const ValidationCheck = (targetEnum, target) => {
  const targetArray = Object.values(targetEnum);
  return targetArray.includes(target);
};
