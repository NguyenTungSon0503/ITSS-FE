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
      .get("http://20.189.73.135:5000/api/contracts/user", {
        headers: {
          authorization: `Bearer ${props.accessToken}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login");
        }
        console.error(error);
      });
  }, [props.accessToken]);

  const nowSchedule = [];
  const datedSchedule = [];

  const contractsDate = (date, time) => {
    const newDate = new Date(date);
    const [hours, minutes] = time.split(":");
    newDate.setUTCHours(hours);
    newDate.setUTCMinutes(minutes);
    newDate.setUTCSeconds(0);
    newDate.setUTCMilliseconds(0);
    return newDate.toISOString();
  };

  data?.map((contract) => {
    const dateContract = contractsDate(contract.date, contract.start_time);
    const timestamp = new Date(dateContract);
    const expochTime = timestamp.getTime();
    const timeNow = new Date();
    const expochTimeNow = timeNow.getTime();
    if (expochTime < expochTimeNow) {
      datedSchedule.push(contract);
    } else {
      nowSchedule.push(contract);
    }
  });

  return (
    <div>
      <div className="manage-page">
        <div style={{ margin: "10px 0" }}>
          <span className="publicsans-normal-charade-16px">次の食事</span>
        </div>

        {nowSchedule?.map((item) => (
          <>
            <ScheduleManage
              key={item.id}
              data={item}
              token={props.accessToken}
              className="schedule1"
            />
          </>
        ))}

        <div style={{ margin: "10px 0" }}>
          <span className="publicsans-normal-charade-16px">
            過去の食事を評価ことができます{" "}
          </span>
        </div>
        {datedSchedule?.map((item) => (
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
