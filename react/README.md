## 리액트를 다루는 기술

>### 참고 URL
- https://medium.com/@dan_abramov/react-components-elements-and-instances-90800811f8ca


>### chapter 01. 리액트 시작
- react는 라이브러리
- render 함수를 통해 state, props 변화를 감지하여 reconciliation
- O(n) 복잡도의 휴리스틱 알고리즘 적용
- virtual DOM을 통해 DOM트리 구조에서 변경된 tree만 real DOM에 적용
- Node.js, yarn, VS code, Git
    - VS code extensiont : ESLint, Reactjs code snippets
- 프로젝트 생성
    - create-react-app (프로젝트명)
    - cd (프로젝트명)
    - yarn start

<br/>

>### chapter 02. JSX
- react bundling → webpack
- 자바스크립트 확장문법 (XML과 유사)
- example
    ``` js
    // JSX
    var a = (
        <div>
            <h1>Awesome <b>React</b></h1>
        </div>
    );

    // babel-loader
    var a = React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            "Awesome ",
            React.createElement(
                "b",
                null,
                "React"
            )
        )
    );
    ```
- 장점
    - html 문법과 유사하여 보기 쉽고 익숙함
    - babel을 통해 JSX 문법검사 실행
    - 컴포넌트를 활용하여 다양한 작업 가능
- 문법
    - return 시 전체를 감싸는 wrapper 필수
    - { } 내부에 js 표현 가능 (if문 대신 삼항연산자 사용)
    - && 를 사용한 조건부 렌더링
    - 인라인 스타일링 → camel case
        - ex) background-color → backgroundColor
    - class 대신 className 사용
    - JSX 내 html 태그들은 꼭 닫아줄 것

<br/>

