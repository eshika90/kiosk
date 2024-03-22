// 사용자가 잘못된 값을 입력했을 때의 에러 처리
export class BadRequestError extends Error {
  constructor(props) {
    super(props);
    this.code = 400;
    this.message = props.message;
  }
}
