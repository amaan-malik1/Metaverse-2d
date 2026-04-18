import axios from "axios";

BACKEND_URL = "http://localhost:3000";

describe("Authentication", () => {
  //checking the signup work
  test("User's able to sign up only once: ", async () => {
    const email = "abeermalik363@gmail.com";
    const password = "amaaaaaaaaaaaanmalik";
    const res = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      email,
      password,
      type: "admin",
    });

    expect(res.statusCode).toBe(200);

    const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      email,
      password,
      type: "admin",
    });

    expect(updatedResponse.statusCode).toBe(400);
  });

  //checking the signup work
  test("Test fail if user not pass email: ", async () => {
    const pass = "amannans";
    const res = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      pass,
    });

    expect(res.statusCode).toBe(400);
  });

  //checking the signin work
  test("Signin succeeed if required field passed:  ", async () => {
    const email = "something@email.com";
    const password = "anisoidn";

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      email,
      password,
    });

    const res = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      email,
      password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  // signin fail work if creds are not correct
  test("Signin faild if email or password are incorrect:  ", async () => {
    const email = "something@email.com";
    const password = "anisoidn";

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      email,
      password,
    });
    const res = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      email: "wrongemail@gmail.com",
      password,
    });

    expect(res.statusCode).toBe(400);
  });
});

describe("User metadata endpoints", () => {
  //middleware for auth
  beforeAll(() => {});

  test("test 1", async() => {
    const email = "amikm1077@gmail.com"
    const pass = "278eyxs73"
    

  });
});
