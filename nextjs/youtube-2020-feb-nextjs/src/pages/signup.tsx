import { useRef, useState } from 'react';

export default function Signup() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState(null);

  async function handleSignUp() {
    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    });
    const json = await response.json();

    setMessage(json);
  }

  return (
    <div>
      <h1>Create a new user!!</h1>
      {JSON.stringify(message)}
      <input type="text" placeholder="name" ref={nameRef} />
      <input type="text" placeholder="email" ref={emailRef} />
      <input type="password" placeholder="password" ref={passwordRef} />
      <button onClick={handleSignUp}>SignUp</button>
    </div>
  );
}
