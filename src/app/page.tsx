"use client";
import AirQualityApp from "@/components/air-quality/app";
import { store } from "@/store";
import { Provider, useDispatch, useSelector } from "react-redux";

export default function Home() {

  return (
    <Provider store={store}>
      <AirQualityApp />
    </Provider>
  );
}