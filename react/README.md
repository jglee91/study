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
- state만으로 해결이 안되는 상황
    - 특정 input에 focusing
    - scroll box 조작
    - canvas 요소 drawing
    - 이 외 특정 case에 의해 DOM에 직접 접근해야 할 때, **ref** 사용
- functional component는 instance가 없으므로 ref attribute 사용 불가
    ```js
    function MyFunctionComponent() {
        return <input />;
    }

    class Parent extends React.Component {
        constructor(props) {
            super(props);
            this.textInput = React.createRef();
        }
        render() {
            // 이 코드는 동작하지 않음
            return (
                <MyFunctionComponent ref={this.textInput} />
            )
        }
    }
    ```
    - 만약 ref가 필요할 경우, class component로 변환시켜서 사용하여야 함(lifecycle method나 state가 필요한 경우도 마찬가지)
    - 다만 DOM element나 class component의 instance에 접근하기 위해 ref attribute를 functional component에서 사용하는 것은 가능
        ```js
        function CustomTextInput(props) {
            // textInput은 ref attribute를 통해 전달되기 위해서 이곳에 정의
            let textInput = React.createRef();

            function handleClick() {
                textInput.current.focus();
            }

            return (
                <div>
                    <input type="text" ref={textInput} />
                    <input type="button" value="Focus the text input" onClick={handleClick} />
                </div>
            )
        }
        ```
- class component에 ref를 달아 유동적으로 사용 가능
    ```js
    <MyComponent ref={ref => {this.myCompoent=ref}}>
    ```
    - 위 방식으로 component 내부의 메서드 및 멤버 변수에도 접근 가능 → 내부의 ref에도 접근 가능
    - myComponent.handleClick, myComponent.input 등
- ref를 남발하여 사용하면 프로젝트 소스가 스파게티화 되므로 DOM에 직접 접근이 필요할 경우에만 사용할 것!
- **참고** ES6 비구조화 할당 문법 : 주로 코드의 가독성과 편리함을 이유로 사용
    ```js
    const object = { foo: 1, bar: 2 };
    function print({foo, bar}) {
        console.log(foo, bar);
    }
    print(object); // 1 2
    ```

<br />

>### Chapter 06. 컴포넌트 반복
- javacript 내장 함수인 map 함수를사용하여 렌더링 가능
    ```js
    arr.map(callback, [thisArg])
    // callback : arr의 각 배열 인자를 반환하는 callback 함수
    //  currentValue
    //  index
    //  array
    // thisArg : callback 함수 내부에서 사용할 this reference
    ```
- react에서는 component 반복시, 생성되는 element에 key attribute가 없으면 경고메세지를 띄워줌
    - react에서는 key값을 통해 변동되는 element를 감지하기 때문
    - 중복되는 key를 가질 경우, application data rendering에 문제가 발생할 수 있음
    - key 값에는 index를 쓰지 말 것 (anti-pattern, **[참고](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md)**)
- react의 데이터 변화 자동감지 re-rendering을 위해 array.push()가 아닌 array.concat()을 사용
    ```js
    const arr = ['1', '2', '3'];
    console.log(arr.push('4'));     // 4
    console.log(arr.concat('4'));   // ['1', '2', '3', '4']
    ```
- **참고** ES6 전개 연산자
    ```js
    const numbers = [1,2,3,4,5,6];
    const morNumbers = [ ...numbers, 6 ]; // [1,2,3,4,5,6]
    ```

<br />

>### Chapter 07. 컴포넌트의 라이프사이클 메서드
- 모든 react component에는 lifecycle이 존재
- lifecycle 카테고리에는 크게 mount, update, unmount가 있음
    - mount : DOM 생성 후 웹 브라우저상에 나타나는 시기
        - constructor, getDerivedStateFromProps, render, componentDidMount
    - update : props 변경시, state 변경시, parent component re-rendering시, forceUpdate를 통한 강제 rendering trigger시
        - getDerivedStateFromProps, shouldComponentUpdate, render, getSnapshotBeforeUpdate, componentDidUpdate
    - unmount : component를 DOM에서 제거하는 시기
        - componentWillUnmount
- component update 성능 개선시, *shouldComponentUpdate*가 중요하게 사용됨

<br />

>### Chapter 08. 함수형 컴포넌트
- react component가 lifecycle API, state를 사용하지 않고 parent로부터 props를 받아 처리하는 역할만 할 때, functional component 사용
- react project에서는 state를 사용하는 component 개수를 최소화하면 성능상 향상됨
    - 대부분 functional component를 사용하고, state나 LifeCycle API를 써야 할 때만 class component 사용

<br />

>### Chapter 09. 컴포넌트 스타일링
- webpack의 css-loader를 이용하여 css를 불러오는 방식
    - 클래스네임 중복 방지를 위해 각 클래스네임에 컴포넌트명을 prefix로 붙임
- CSS 사용 편의성을 위해 Sass, LESS, Stylus 등 CSS 전처리기를 사용하기도 함
- CSS Module
    - CSS를 모듈화하여 사용
    - CSS 클래스를 통해 스코프를 지역적으로 제한
    ``` js
    // webpack load시
    {
        box: 'abc'
    }
    // 클래스 적용시
    className = {styles.box}
    ```
- Sass
- styled-components