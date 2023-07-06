import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { withAuth } from "../authentication/Login";
import ScheduleManage from "../test/nikktei";

const Contracts = withAuth((props) => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contracts/user", {
        headers: {
          authorization: `Bearer ${props.accessToken}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login");
        }
        console.error(error);
      });
  }, [props.accessToken]);

  return (
    <div>
      <div className="manage-page">
        <div style={{ margin: "10px 0" }}>
          <span className="publicsans-normal-charade-16px">次の食事</span>
        </div>

        {data?.map((item) => (
          <>
            <ScheduleManage key={item.id} data={item} token={props.accessToken} className="schedule1" />
          </>
        ))}

        <div style={{ margin: "10px 0" }}>
          <span className="publicsans-normal-charade-16px">
            過去の食事を評価ことができます{" "}
          </span>
        </div>
        {data?.map((item) => (
          <>
            <ScheduleManage
              key={item.id}
              data={item}
              token={props.accessToken}
              className="schedule2"
            />
          </>
        ))}
      </div>
    </div>
  );
});

export default Contracts;
