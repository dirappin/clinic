import React, { useState } from "react";
import Layout from "../../Layout";
import { Button } from "../../components/Form";
import { BiTime } from "react-icons/bi";
import {
  MdOutlineCalendarMonth,
} from "react-icons/md";
import { BsCalendarMonth } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import PayementItem from "../../components/PayementItem";
import { backendBaseUrl } from "../../constant";
import FetchError from "../../components/error/FetchError";
import EmptyResult from "../../components/common/EmptyResult";
import PaymentStatusCard from "./PaymentStatusCard";


const thclass = "text-start text-sm font-medium py-3 px-2 whitespace-nowrap";

function Payments() {
  const navigate = useNavigate();

  const { data: dataCount, mutate: mutateDataCount, error: dataCountError, isLoading: dataCountLoading } = useSWR(`${backendBaseUrl}medical-record/paymentdatacount`);
  const { data, mutate, size, setSize, isValidating, isLoading, error } =
    useSWRInfinite(
      (index) =>
        `${backendBaseUrl}medical-record/find/payment/withpagination/?skip=${index + 1
        }`
    );


  const payements = data ? [].concat(...data) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    payements.length >= dataCount
  const isRefreshing = isValidating && data && data.length === size;


  const boxes = [
    {
      id: 1,
      title: "Today Payments",
      value: "4,42,236",
      color: ["bg-subMain", "text-subMain"],
      icon: BiTime,
      path: "dayPayament",
    },
    {
      id: 2,
      title: "Monthly Payments",
      value: "12,42,500",
      color: ["bg-orange-500", "text-orange-500"],
      icon: BsCalendarMonth,
      path: "mounthPayment",
    },
    {
      id: 3,
      title: "Yearly Payments",
      value: "345,70,000",
      color: ["bg-green-500", "text-green-500"],
      icon: MdOutlineCalendarMonth,
      path: "yearPayment"
    },
  ];


  return (
    <Layout>
      <h1 className="text-xl font-semibold">Payments</h1>
      {/* boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {boxes.map((box, index) => (
          <PaymentStatusCard key={index} box={box} path={box.path} />
        ))}
      </div>

      <div
        className="bg-white relative flex flex-col my-8 rounded-xl border-[1px] border-border p-5"
      >
        {data && data.length < 1 && <EmptyResult disableButton lable={'No payments yet'} />}
        {error && <FetchError loading={isLoading} action={() => mutate()} />}
        <table className="table-auto  w-full">
          {payements.length > 0 &&
            <thead className="bg-dry rounded-md overflow-hidden">
              <tr>
                <th className={thclass}>Date</th>
                <th className={thclass}>Doctor</th>
                <th className={thclass}>Amount</th>
                <th className={thclass}>Method</th>
                <th className={thclass}>Action</th>
              </tr>
            </thead>
          }

          <tbody>
            {payements.length > 0 && payements.map((item) => (
              <PayementItem key={item._id} item={item} />
            ))}
          </tbody>
        </table>
        <div className="w-full py-2">
          {payements.length > 0 &&
            <Button
              disabled={isReachingEnd}
              onClick={() => setSize(size + 1)}
              loading={isRefreshing}
              className={'self-start w-full '}
              label={isLoadingMore
                ? "loading..."
                : isReachingEnd
                  ? "that's all"
                  : "load more"}>
            </Button>
          }
        </div>
      </div>
    </Layout>
  );
}

export default Payments;
