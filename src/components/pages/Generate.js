import React from "react";
import useRefreshToken from "../hooks/useRefreshToken";

const Generate = () => {
  const refresh = useRefreshToken();
  const clickHandler = async (e) => {
    const res = await refresh();
    console.log(res);
  };
  return <button onClick={clickHandler}>Generate</button>;
};

export default Generate;
