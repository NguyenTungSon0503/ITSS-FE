import React from "react";

function ShowToken({ accessToken }) {
  if (!accessToken) {
    return null;
  }
  return (
    <div>
      <h2>Access Token:</h2>
      <p>{accessToken}</p>
    </div>
  );
}

export default ShowToken;