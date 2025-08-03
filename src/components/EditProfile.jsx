import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser, removeUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [isError, setIsError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setIsError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      setShowToast(true);
    } catch (err) {
      console.error("ERROR RESPONSE:", err.response?.data || err.message);
      setIsError(err.response?.data || "Something went wrong");
    }
  };

  useEffect(() => {
    setIsEdit(true);
  }, []);

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                {/* FirstName */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name: </legend>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    className="input"
                  />
                </fieldset>

                {/* LastName */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name: </legend>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    className="input"
                  />
                </fieldset>
                {/* PhotoUrl */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo URL: </legend>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => {
                      setPhotoUrl(e.target.value);
                    }}
                    className="input"
                  />
                </fieldset>
                {/* Age */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age: </legend>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                    className="input"
                  />
                </fieldset>
                {/* Gender */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender: </legend>
                  <div className="flex gap-4 mt-2">
                    <label className="cursor-pointer label">
                      <span className="label-text mr-2">Male</span>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={(e) => setGender(e.target.value)}
                        className="radio radio-primary"
                      />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mr-2">Female</span>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={(e) => setGender(e.target.value)}
                        className="radio radio-primary"
                      />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mr-2">Other</span>
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={gender === "other"}
                        onChange={(e) => setGender(e.target.value)}
                        className="radio radio-primary"
                      />
                    </label>
                  </div>
                </fieldset>
                {/* About */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About: </legend>
                  <textarea
                    value={about}
                    onChange={(e) => {
                      setAbout(e.target.value);
                    }}
                    className="textarea textarea-bordered w-full"
                    placeholder="Tell us about yourself..."
                    // rows="2"
                  />
                </fieldset>
              </div>
              <p className="text-red-500 text-center">{isError}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary m-2" onClick={saveProfile}>
                  Save Profile{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about, isEdit }}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved successfully...!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
