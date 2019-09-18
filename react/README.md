## 리액트를 다루는 기술

>### 참고 URL
- https://medium.com/@dan_abramov/react-components-elements-and-instances-90800811f8ca
- https://blog.logrocket.com/a-complete-guide-to-default-props-in-react-984ea8e6972d/

>### chapter 01. 리액트 시작
- react는 라이브러리
- render 함수를 통해 state, props 변화를 감지하여 reconciliation
- O(n) 복잡도의 휴리스틱 알고리즘 적용
- virtual DOM을 통해 DOM트리 구조에서 변경된 tree만 real DOM에 적용
- Node.js, yarn, VS code, Git
    - VS code extensiont : ESLint, Reactjs code snippets
- 프로젝트 생성 및 실행
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

>### chapter 03. Component
- component 생성 → 별도의 file 생성 후, 거기에서 관리
- module import / export
- props : component의 속성
    - 부모 컴포넌트로부터 받은 props는 read-only
    - (component).defaultProps를 통해 기본 props 값 설정 가능
    - prop-types를 통해 각 prop의 타입 지정 가능
    - prop-types의 isRequired를 통해 prop 필수여부 지정 가능
    - prop-types 종류
        - array : 배열
        - bool : 참, 거짓
        - func : 함수
        - number : 숫자
        - object : 객체
        - string : 문자열
        - symbol : ES6 문법의 symbol 개체
        - node : 렌더링 가능한 모든 것(숫자, 문자열, element 또는 이들로 구성된 배열)
        - element : 리액트 요소
        - instanceOf(MyClass) : 특정 클래스의 인스턴스
        - oneOf(['A', 'B']) : 주어진 배열 요소 중 값 하나
        - oneOfType([React.PropTypes.string, React.PropTypes.number]) : 주어진 배열 안의 종류 중 하나
        - arrayOf(React.PropTypes.number) : 주어진 종류료 구성된 배열
        - objectOf(React.PropTypes.number) : 주어진 종류의 값을 가진 객체
        - shape({name: React.PropTypes.string, age: React.PropTypes.number}) : 주어진 schema를 가진 객체
        - any : 아무 종류
- state : 컴포넌트 내부에서 CRUD가 가능한 상태값
    - constructor 내부에 설정 (class형 component인 경우)
        - constructor 바깥에서 정의할 수도 있음
    - component에서 발생하는 event를 통해 별도의 함수를 선언하여 제어
    - 항상 setState를 통해서 접근, 직접 접근은 X

<br/>

>### Chapter 04. 이벤트 핸들링
- 리액트의 이벤트 시스템은 일반 웹 브라우저의 HTML 이벤트와 인터페이스가 동일
- 이벤트 사용시 주의사항
    - 이벤트 이름은 camelCase
    - 이벤트 실행시, 함수 형태의 값을 전달
    - DOM 요소에만 이벤트 설정 가능
- 리액트에서 지원하는 이벤트 종류 확인은 아래 링크에서 확인
    - [리액트 이벤트 매뉴얼](https://reactjs.org/docs/events.html)
- **참고** : [SyntheticEvnet와 Event Pooling](https://ko.reactjs.org/docs/events.html)

<br />

>### Chapter 05. ref: DOM에 이름 달기
- public/index.html에 id가 root인 div가 있으며, 여기에 react component를 렌더링 함
    ```html
    (...)
        <body>
            <div id="root"></div>
        </body>
    (...)
    ```
    ```js
    (...)
        ReactDOM.render(<App />, document.getElementById('root'));
    (...)
    ````
- 리액트에서는 ref를 사용하여 DOM에 고유값을 부여
    - 만약 id를 쓰면, 렌더링 이후 생성되는 DOM tree에 중복되는 id가 발생할 가능성 존재
    - ref는 전역적으로 작동하지 않고, 컴포넌트 내부에서만 작동하기 때문에 문제 없음

