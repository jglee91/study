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