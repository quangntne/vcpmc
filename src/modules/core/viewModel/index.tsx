import React, { useRef, useState } from "react";

interface IReturn<S> {
  getState: () => S;
  update: (data: S) => void;
  updateSilent: (data: S) => void;
  fetch: (data: S) => void;
  fetchSilent: (data: S) => void;
}

const useViewModel: <S>(initialState: S) => IReturn<S> = (initialState) => {
  const [step, setStep] = useState<number>(0);
  const state = useRef<typeof initialState>(initialState);

  const reRenderView = () => {
    setStep((prev) => prev + 1);
  };

  const getState = () => {
    return state.current;
  };

  const update = (data) => {
    state.current = {
      ...state.current,
      ...data,
    };
    reRenderView();
  };

  const updateSilent = (data) => {
    state.current = {
      ...state.current,
      ...data,
    };
  };

  const fetch = (data) => {
    state.current = {
      ...state.current,
      ...data,
    };
    reRenderView();
  };

  const fetchSilent = (data) => {
    state.current = {
      ...state.current,
      ...data,
    };
  };

  return {
    getState,
    update,
    updateSilent,
    fetch,
    fetchSilent,
  };
};

export default useViewModel;
