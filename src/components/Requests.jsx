import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  const reviewRequest = async (_id, status) => {
    try {
      fetchRequests();
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return <h1 className="flex justify-center my-10">No Requests Found</h1>;

  return (
    <>
      <div className="text-center my-10">
        <h1 className="text-bold text-white text-4xl">Connections</h1>
        {requests.map((request) => {
          const { _id, firstName, lastName, age, gender, about, photoUrl } =
            request.fromUserId;
          return (
            <div
              key={_id}
              className="m-4 p-4 rounded-lg bg-base-300  flex items-center w-2/3 mx-auto"
            >
              <div className="w-100">
                <img
                  src={photoUrl}
                  alt="photo"
                  className="w-20 h-20 rounded-full mx-auto"
                />
              </div>
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                <p>{age + "," + gender}</p>
                <p>{about}</p>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  className="btn btn-primary"
                  onClick={() => reviewRequest(request._id, "rejected")}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => reviewRequest(request._id, "accepted")}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Requests;
