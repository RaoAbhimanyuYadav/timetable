import { useState } from "react";
import { useDispatch } from "react-redux";

const useFetchAll = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  return {
    isLoading,
  };
};

export default useFetchAll;
