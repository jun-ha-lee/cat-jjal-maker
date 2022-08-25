// 컴포넌트 만들기
const Title = (props) => { // props로 가져와야함, children으로 오기 때문
  console.log(props);
  return (
    <h1>{props.children}</h1>
  );
}

export default Title; // 내보낸다 기본으로 Title이름으로