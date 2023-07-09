import React, { useState } from "react";
import "./style.css";
import { Button } from "@mui/material";
import { Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Rating } from "@mui/material";
import { Image } from "cloudinary-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ScheduleManage({ data, className, token }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);

  const [value1, setValue1] = React.useState(null);

  const [reviews, setReviews] = useState(null);

  const handleReview = (key, value) => {
    setReviews({ ...reviews, [key]: value, id: data.id });
  };
  const handleRating = (key, value) => {
    setValue(value);
    handleReview(key, value);
  };
  const handleComment = (key, value) => {
    setValue1(value);
    handleReview(key, value);
  };

  const handleSend = () => {
    console.log(token);
    try {
      const res = axios
        .post("http://localhost:5000/api/contracts/review", reviews, {
          headers: {
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then(() => {
          setOpen(false);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ margin: "18px  0" }}>
      <div>
        {/*Dialog*/}
        <Dialog open={open} onClose={handleClose} token={token}>
          <div style={{ margin: "18px 18px 0" }}>評価</div>
          <DialogContent>
            <div className="appraise">
              <Image
                cloudName="dul81x4pq"
                publicId={data.avatar}
                width="150"
                crop="scale"
              />
              <div className="appraise-header">
                <div className="publicsans-normal-charade-14px">名前</div>
                <div className="publicsans-normal-charade-14px">
                  {data.name}
                </div>
              </div>
            </div>

            <div className=" rate">
              <div className="publicsans-normal-charade-14px">満足度</div>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(e, value) => handleRating("rate", value)}
                size="large"
              />
            </div>
            <TextField
              id="demo-helper-text-aligned-no-helper"
              label="評価"
              fullWidth
              rows={4}
              multiline={true}
              value={value1}
              onChange={(e) => handleComment("comment", e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            {/*Gửi req : data lưu trong reviews*/}
            <Button
              variant="outlined"
              className="btn btn-cancel"
              onClick={handleClose}
            >
              キャンセル
            </Button>
            <Button
              variant="contained"
              className="btn btn-accept"
              onClick={handleSend}
            >
              送る
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={`${className} row-gap-0 schedule-manager`}>
        <div className="col col-2 date-time">
          <span className="">{data.date.split("T")[0]}</span>
          <span>
            {data.start_time} {data.end_time}
          </span>
        </div>
        <Divider orientation="vertical" flexItem></Divider>
        <div className="infor col col-10">
          <Image
            cloudName="dul81x4pq"
            publicId={data.avatar}
            width="150"
            crop="scale"
          />
          <div className="infor-right">
            <div className="infor-field">
              <div className="infor-col">
                <div className="item-field">
                  <div className="infor-item">名前</div>
                  <div className="infor-item-3">{data.name}</div>
                </div>
                <div className="item-field">
                  <div className="infor-item">年齢</div>
                  <div className="infor-item-3">{data.age}</div>
                </div>
                <div className="item-field">
                  <div className="infor-item">性別</div>
                  <div className="infor-item-3">
                    {data.sex === "male"
                      ? "男性"
                      : data.sex === "female"
                      ? "女性"
                      : "その他"}
                  </div>
                </div>
              </div>
              <div className="infor-col-2">
                <div className="item-field">
                  <div className="infor-item-2">提案</div>
                  <div className="infor-item-1x"> {data.food_recommend} </div>
                </div>
                <div className="item-field">
                  <div className="infor-item-2">説明</div>
                  <div className="infor-item-2x"> {data.description}</div>
                </div>

                <div className="infor-item-2"></div>
              </div>
              <div>
                <div className="item-field3">
                  <div style={{ margin: "11px" }}>価値</div>
                  <div style={{ margin: "11px" }}>{data.meal_price}</div>
                </div>
              </div>
            </div>
            <div className="manage-btn">
              <Button
                variant="contained"
                className="btn btn-accept"
                onClick={() => navigate("/chat")}
              >
                チャット
              </Button>
              <Button
                variant="contained"
                className="btn btn-accept"
                onClick={(event) => {
                  if (className === "schedule2") {
                    event.stopPropagation();
                    handleClickOpen();
                  }
                }}
              >
                {className === "schedule1" ? "キャンセル" : "評価"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ScheduleManage;
