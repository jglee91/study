# NextJS Study with Youtube Tutorial

## Part1. Router for Beginners

<hr/>

## Part2. Data Fetching with getInitialProps
- mock server
    - use json-server to use simple REST API Server
        ``` json
        {
            ...
            "scripts": {
                ...
                "mock-server": "json-server --watch ./db.json -p 4001 -d 3000"
            },
            ...
        }
        ```
        ``` cmd
        $ npm install -g json-server
        $ npm run mock-server
        ```
- fetching data with React.useEffect, the server response empty page
    - use **getInitialProps!**
        ``` js
        export default function List({ ownersList }) {
            return (
                <div>
                {ownersList.map((owner, index) => (
                    <div key={index}>
                    <Link as={`/${owner.vehicle}/${owner.ownerName}`} href="/[vehicle]/[person]">
                        <a>
                        Navigate to {owner.ownerName}'s {owner.vehicle}
                        </a>
                    </Link>
                    </div>
                ))}
                </div>
            );
        }

        List.getInitialProps = async () => {
            const response = await fetch('http://localhost:4001/vehicles');
            const ownersList = await response.json();

            return { ownersList };
        };
        ```
    - getInitialProps can receive **context** parameter

<hr/>

## Part3. TypeScript Migration
1. Select one Entry Point
2. Get childs (recursively)

- change file ext and restart nextjs, will see the error
    ``` cmd
    It looks like you're trying to use TypeScript but do not have the required package(s) installed.

    Please install typescript, @types/react, and @types/node by running:

            yarn add --dev typescript @types/react @types/node

    If you are not trying to use TypeScript, please remove the tsconfig.json file from your package root (and any TypeScript files).
    ```
- install dependencies 
    ``` cmd
    $ npm install --save-dev typescript @types/react @types/node
    ```
- after install dependencies and restart, **tsconfig.json** will create root path
- modify **strict** value
    ``` json
    {
        "compilerOptions": {
            ...
            "strict": true,
            ...
        },
        ...
    }
    ```

<hr/>

## Part4. API Routes using SQL Database
1. Create all the Routes
2. Create a database using SQLite
    - in tutorial, use simple DBMS (no 'external' S/W)
3. Connect 2 first steps

<hr/>

## Part5. Material-ui Integration + _app and _document

<hr/>

## Part6. Authentication for API Routes using JWT and bcrypt
- Authentication is the process of verifying an identity
- Authorization is the process of verifying what someone is allowed to do
- Auth Flow
    - client: user login with username and password
    - server: issue JWT
- JWT
    - Header: base64 encoded json with "alg" and "type"
    - Payload / Claims: base64 encoded json with iss, sub, aud, exp, ...
    - Signature: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), your-256-bit-secret)
- Persist Authenticated
    - Cookies
        - Pros
            - mitigated XSS attacks if using "httpOnly" (cookies are not accessible via js)
            - cookies are sent "automatically" in every request
        - Cons
            - CSRF is a problem (automatically sent)
    - WebStorage (LocalStorage or SessionStorage)
        - Pros
            - Protected against CSRF attacks
        - Cons 
            - need to add the token to every request
            - vulnerable to XSS
            - shouldn't store "sensitive" data in WebStorage

<hr/>

## Part7. Comsume Authenticated APIs with cookies
- Change /api/login to use cookies
- Change "authentication middleware" to check cookies
- Create a login and signup page
- Create 2 pages to consume protected APIS
    - SSR
    - Client-Side
    ``` cmd
    $ npm install --save cookie
    $ npm install --save-dev @types/cookie
    ```

<hr/>

## Part8. Static Site Generation (SSG) | getStaticProps and getStaticPaths
- getStaticProps: only run at build time
- getStaticProps will use when...
    - the data required to render the page is available at build time ahead of a user's req
    - the data comes fro mheadless CMS
    - the data can be publicly cached (not user-specific)
    - the page must be pre-rendered (for SEO) and be very fast
        - getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance
- getStaticPaths: only allow specific path
    - fallback
    - paths

<hr/>

## Part9. Data Fetching with getServerSideProps
- runs only on your server
    - the code does not run on the browser
- on client side navigation the borwser calls getServerSideProps as an "API" endpoint/proxy
    - Next.js does that automatically for you
- We can use database directly
    - SELECT * FROM table