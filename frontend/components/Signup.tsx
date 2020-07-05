import { FC, useState } from "react";
import { useRouter } from "next/router";

import { useRegisterUserMutation } from "../graphql/generated/graphql";
import { Form } from "./styles";

const Signup: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser] = useRegisterUserMutation();
  const router = useRouter();

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log("form submitted");
        const res = await registerUser({
          variables: {
            email,
            password,
          },
        });
        console.log(res);
        await router.push("/");
      }}
    >
      <fieldset>
        <h2>Sign Up For An Account</h2>
      </fieldset>
      <input
        value={email}
        placeholder="email"
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        value={password}
        placeholder="password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit">Sign Up</button>
    </Form>
  );
};

export default Signup;
