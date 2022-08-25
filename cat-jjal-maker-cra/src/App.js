import logo from './logo.svg';
import React from 'react';
import './App.css';
import Title from './components/Title'; // Title을 Title.js에서 가져온다

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

// API 받아오기
const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};


console.log("야옹");

// const catItem = (
//   <li>
//     <img src="https://cataas.com/cat/60b73094e04e18001194a309/says/react" />
//   </li>
// );

// 컴포넌트 만들기
// 처음화면에서 아랫부분에 작은사진들에 대한 것
function CatItem(props) { // 컴포넌트는 대문자로시작해야 함
  // console.log(props);
  return (
    <li>
      {props.title}
      <img src={props.img} alt={props.alt} style={{ width: '150px', border: '1px solid red' }} /> {/* 스타일 줄때 */}
    </li>
  );
}

/*
const FOO = 'hello world';

function foo() {
  return 1;
}
*/

// const favorites = (
//   <ul class="favorites">
//     <CatItem img='https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn' title='cat1' alt='cat1' />
//     <CatItem img='https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript' />
//     {/*{catItem}{catItem}{catItem}*/}
//     {/*{1 + 2}{FOO}{FOO === 'hello world' ? 'true' : 'false'}{foo()}*/}
//   </ul>
// );

// 컴포넌트 만들기
function Favorites({ favoritesCard }) { // App에 있는 favoritesCard를 받아온다

  // 즐겨찾기에 사진이 없을때
  if (favoritesCard.length === 0) {
    return (
      <div>사진 위 하트를 눌러 고양이 사진을 저장해봐요!</div>
    );
  }

  return (
    <ul className="favorites">{/*리액트에서는 class대신 className으로 사용 */}
      {/* map() 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다. */}
      {favoritesCard.map(cat => <CatItem img={cat} key={cat} title='cat1' alt='cat1' />)}
      {/* cat을 인자로 받아온다 */}
      {/*favoritesCard.map(function (cat) {
        return (
          <CatItem img={cat} key={cat} title='cat1' alt='cat1' />
        );
      })*/}
      {/* map은 배열갯수만큼 순회하면서 호출 */}
      {/* key값은 유니크한 값을 넣어야 하는데 현재는 이미지 url이 유니크하므로 {cat}을 넣음 */}
    </ul>
  );

  //console.log(`뭘까 ${cat}`);

}

// const title = (
//   <h1>1번째 고양이 가라사대</h1>
// );


// // 컴포넌트 만들기
// const Title = (props) => { // props로 가져와야함, children으로 오기 때문
//   console.log(props);
//   return (
//     <h1>{props.children}</h1>
//   );
// }

// const form = (
//   <form>
//     <input type="text" name="name" placeholder="영어 대사를 입력해주세요" />
//     <button type="submit">생성</button>
//   </form>
// );

const Form = ({ updateMainCat }) => { // App에 있는 updateMainCat 받아옴
  // 생성버튼을 누를때 마다 n번째 고양이 가라사대로 만들기
  // n값이 증가
  // useState
  /*
  const counterState = React.useState(1); // 1은 초기값, 문자열로 써도 됨, 리액트의 useState를 사용한다
  const counter = counterState[0]; // useState의 첫번째 인자는 counter,
  const setCounter = counterState[1]; // useState의 두번째 인자는 setCounter, 두번째 인자를 통해 첫번째 인자를 마음대로 변경할 수 있음
  */
  // 아래의 handleFormSubmit함수의 setCounter(100)에서 알수 있듯이 생성버튼 누르면 아래의 '카운터는 지금 100'으로 변함


  // 한글이 포함되어있는지 아닌지
  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
  const [errorMsg, setErrorMsg] = React.useState(''); // 에러메세지, 초기값은 없음


  // 입력을 대문자로 받기위해
  const [inputValue, setInputValue] = React.useState('');
  // inputValue에 사용자가 입력한 값을 받고 <input>의 value값을 {inputValue}로 받아온다
  // setInputValue안에서 변환작업 후 반환

  // 대문자로 변경
  function handleInputChange(e) {
    const userInputValue = e.target.value;
    // console.log(userInputValue.toUpperCase()); // input에 입력한 값을 받아오는데 대문자로
    setInputValue(userInputValue.toUpperCase()); // input에 입력한 값을 받아오고 대문자로

    // 한글인지 아닌지 검사
    // console.log(includesHangul(userInputValue)); // 한글일때 true
    if (includesHangul(userInputValue) === true) {
      // console.log('ttttttt');
      setErrorMsg('한글은 입력할 수 없습니다.');
    } else {
      setErrorMsg(''); // 한글이 입력창에 없을때 초기화, 이거 써도 되고 아래거 선택해서 사용
    }
  }

  // 빈값으로 생성 누를때 경고
  function handleFormSubmit(e) {
    e.preventDefault();
    setErrorMsg(''); // 에러메세지 초기화
    if (inputValue === '') {
      setErrorMsg('빈값으로는 생성할 수 없습니다.');
      return; // 빈값에러가 있으면 이 함수는 종료 밑에 updateMainCat()실행되지 않고
    }
    updateMainCat(inputValue); // 모두 통과되면 그때 updateMainCat()실행, updateMainCat함수에 inputValue를 인자로 넘겨줌
    // 왜 넘겨주냐면 고양이 그림에 사용자가 입력한 영어가 나와야 하기 때문
  }

  return (
    <form onSubmit={handleFormSubmit}> {/* form에서 onSubmit을 했을때 handleFormSubmit함수 호출 */}
      <input
        type="text"
        name="name"
        placeholder="영어 대사를 입력해주세요"
        value={inputValue}
        onChange={handleInputChange}// input에 값이 변화할때마다 이 함수가 호출된다
      />
      <button type="submit">생성</button>
      <p style={{ color: 'red' }}>{errorMsg}</p>
    </form>
  );
}

// const mainCard = (
//   <div class="main-card">
//     <img src="https://cataas.com/cat/60b73094e04e18001194a309/says/react" alt="고양이" width="400" />
//     <button>🤍</button>
//   </div>
// );

// 컴포넌트 만들기
const MainCard = ({ img, onHeartClick, alreadyFavorite }) => { // 괄호안에 props가 아닌 {img}로 하면 아래에 props.~~~가 아니라 {img}로 가능
  const heartIcon = alreadyFavorite ? "💖" : "🤍"; // 이미 favoritesCard에 있다면 빨간하트를 아니라면 하얀하트

  return (
    <div className="main-card">{/*리액트에서는 class대신 className으로 사용 */}
      <img src={img} alt='고양이' width='400' />
      <button
        onClick={onHeartClick}>{heartIcon}</button>{/* 위에 handleHeartClick을 받아와서 바로 사용가능 */}
      {/*버튼에 onClick했을때 handleHeartClick함수를 불러라 */}
      {/* 버튼에 onMouseOver했을 때 */}
    </div>
  );
}

// 컴포넌트 만들기
const App = () => {
  // <Title>안에서 useState를 사용하기 위해(counter)
  // const [counter, setCounter] = React.useState(jsonLocalStorage.getItem('카운터'));
  // 카운터가 바뀔때 마다 로컬스토리지에 접근하기때문에
  // 처음 한번만 접근하게 하려면 함수를 넘기면 된다
  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem('카운터'); // 초기값
  });

  // counter가 없으면 공백 있으면 counter번째
  const counterCheck = counter === null ? '' : `${counter} 번째 `;
  // 괄호안은 초기값, 문자열로 써도 됨, 리액트의 useState를 사용한다
  // localStorage에 저장된 키값인 '카운터'의 값을 가져온다, 로컬스토리지의 value값은 string값으로 저장
  // counter는 첫번째 인자, setCounter는 두번째 인자

  //<MainCard>에서 생성버튼을 누르면 다른이미지가 나오게 하도록 하기 위해
  // 고양이 사진들
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  const CAT3 = "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

  const [mainCatImage, setMainCatImage] = React.useState(''); // 비어있는 초기값

  // 처음 접속시에 maincat이미지를 api로 받아오기
  async function setInitialCat() {
    const newCat = await fetchCat('First Cat'); // 데이터를 받아오기 위해 await문법, await로 받아오려면 상위함수가 async
    console.log(newCat);
    setMainCatImage(newCat); // newCat 사진으로 바뀜
  }

  // setInitialCat(); // 처음 진입시 setInitialCat함수 호출
  // setInitialCat함수가 App생성시 한번만 불리는게 아니라 계속 호출됨, 한번만 호출되게 해야함(UI를 새로 그릴때 마다 계속 호출됨)
  // React.useEffect사용(원하는 시점에만 호출하게 하는)
  React.useEffect(() => {
    setInitialCat();
  }, []); // 빈 배열을 넘기면 컴포넌트가 맨처음 나타날때만 호출된다.
  // 배열안에 값이 있을 경우 예를들어 counter가 들어가면, counter 변수가 바뀔때마다 호출



  // 생성버튼을 눌렀을때 불리는 함수
  async function updateMainCat(inputValue) { // await로 받아오려면 상위함수가 async, inputValue는 사용자가 입력한 데이터
    // 생성버튼을 누를때 api받아오는
    const newCat = await fetchCat(inputValue); // 데이터를 받아오기 위해 await문법, await로 받아오려면 상위함수가 async

    // const nextCounter = counter + 1;
    // setCounter(nextCounter);

    // 노마드코더 참고
    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem('카운터', nextCounter); // 브라우저에 counter저장
      return nextCounter;
    });

    // 생성버튼을 누르면 -> 고양이사진을 바꿔라 이므로 여기안에
    setMainCatImage(newCat); // newCat 사진으로 바뀜

  }

  // 메인카드에 하트를 눌렀을때 Favorites에 추가되는
  // favoritesCard는 첫번째 인자를, setFavoritesCard는 두번째 인자로 함수임
  // const [favoritesCard, setFavoritesCard] = React.useState(jsonLocalStorage.getItem('즐겨찾는사진') || []);
  const [favoritesCard, setFavoritesCard] = React.useState(() => {
    return jsonLocalStorage.getItem('즐겨찾는사진') || [];
  });
  // 앞에 로컬스토리지에 '즐겨찾는사진'이 빈값이면 뒤에 빈배열[]을 사용해라

  // 메인카드에 하트 눌렀을때 불리는 handleHeartClick 함수
  function handleHeartClick() {
    const nextFavorites = [...favoritesCard, mainCatImage]; // ...은 스프레드 문법이며 favoritesCard배열 전체를 가져온다는 의미 즉 => setFavoritesCard([CAT1, CAT2, CAT3]);
    // mainCatImage가 뒤로 붙는다
    setFavoritesCard(nextFavorites); // favoritesCard배열에 nextFavorites 추가
    jsonLocalStorage.setItem('즐겨찾는사진', nextFavorites);

  }

  // 메인이미지의 하트를 이미 클릭하였을때
  // 메인이미지의 하트에서 사용한다
  const alreadyFavorite = favoritesCard.includes(mainCatImage); // favoritesCard이 mainCatImage를 포함하고 있나?,javascript문법
  // 포함하고있다면 true로 반환

  return (
    <div>{/* <div>로 감싸는 이유는 감싸지 않으면 에러가 남, 최상위 태그가 하나만 남도록 div로 감싼다 */}
      <Title>{counterCheck}고양이 가라사대</Title>{/* JSX에서 변수를 사용할때는 중괄호쓰고 변수명 */}
      <Title>2번째 고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} />{/* props에 handleFormSubmit함수 자체를 넘겨버림 */}
      <MainCard img={mainCatImage} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite} />{/* mainCatImage변수, props에 handleHeartClick함수를 넘겨버림 */}
      {/* alreadyFavorite을 MainCard에 props으로 넘긴다 */}
      <Favorites favoritesCard={favoritesCard} />
    </div>
  );
}

export default App;
