import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Contants";

const Login = () => {
  const dispatch = useDispatch();
  const [emailId, setEmailId] = useState("shubham@gmail.com");
  const [password, setPassword] = useState("Shubham@12345");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className="my-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
                className="input"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="input"
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary m-2" onClick={handleLogin}>
              Login{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
