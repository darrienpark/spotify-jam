"use client";

import {
  Anchor,
  Button,
  Container,
  TextInput,
  Flex,
  Divider,
  Checkbox,
  Text,
} from "@mantine/core";
import { useState } from "react";

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe(event.currentTarget.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle login logic here
    console.log("Form submitted");
  };

  return (
    <Flex justify="center" align="center" h="100vh">
      <Container size="xs" w="100%">
        <h1>Sign In</h1>
        <form>
          <Flex gap="md" direction="column" justify="center" align="center">
            <TextInput
              type="text"
              label="Username"
              placeholder="Enter your username"
              required
              w="100%"
            />
            <TextInput
              type="password"
              label="Password"
              placeholder="Enter your password"
              required
              w="100%"
            />
            <Checkbox
              w="100%"
              label="Remember me"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <Button type="submit" variant="filled" fullWidth>
              Login
            </Button>
            <Anchor ta="center" href="https://www.google.com">
              Forgot Password?
            </Anchor>
            <Divider my="md" w="100%" />
            <Text ta="center">Don't have an account?</Text>
            <Button variant="light" fullWidth>
              Create an account
            </Button>
          </Flex>
        </form>
      </Container>
    </Flex>
  );
}
