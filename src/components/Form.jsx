import { Listbox, Menu, Switch } from "@headlessui/react";
import React, { useRef } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import DatePicker from "react-datepicker";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";



import { cn } from "../util/cn";

export function Input({
  label,
  name,
  type,
  color,
  placeholder,
  className,
  register,
  errormessage,
  ...props
}) {
  const input = useRef(null);
  const [reveal, setReveal] = useState(false);
  return (
    <div className={cn("text-sm w-full")}>
      <label
        className={`${color ? "text-black text-sm" : "text-white font-semibold"
          } `}
      >
        {label}
      </label>

      <div className={cn("", {
        "flex items-center gap-2": type === "password"
      })}>
        <input
          ref={input}
          {...props}
          name={name}
          {...register}
          type={type}
          placeholder={placeholder}
          className={cn(
            "w-full bg-transparent text-sm mt-3 p-4 border  rounded-lg focus:border focus:border-subMain",
            className,
            {
              " font-light border-white text-white": !color,
            }
          )}
        />

        {type === 'password' && (
          <button type="button" onClick={() => {
            setReveal(!reveal)
            input.current.type = reveal ? 'password' : 'text' ;
          }} className="h-[3.2rem] w-20 bg-gray-100 rounded-md border relative top-1 border-gray-300 flex items-center text-2xl justify-center">
            {!reveal ? <VscEye className="text-gray-600 " /> : <VscEyeClosed className="text-gray-600 " />}
          </button>
        )}
      </div>
      <span className="text-red-400 text-[12px]">{errormessage ? errormessage : ""}</span>
    </div>
  );
}

// button
export function Button({ label, onClick, loading, Icon, className, disabled, ...props }) {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      onClick={onClick}
      className={cn(
        "w-full flex-rows gap-4 hover:opacity-80 transitions bg-subMain text-white text-sm font-medium px-2 py-4 rounded disabled:bg-gray-300 disabled:text-gray-700 disabled:cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <BiLoaderCircle className="animate-spin text-white text-2xl" />
      ) : (
        <>
          {label}
          {Icon && <Icon className={cn("text-white text-xl", { " text-gray-500": disabled })} />}
        </>
      )}
    </button>
  );
}

export function MenuSelect({ children, datas, item: data }) {
  return (
    <div className="text-sm w-full relative">
      <Menu>
        <Menu.Button>{children}</Menu.Button>
        <Menu.Items className="flex flex-col z-50 gap-4 absolute left-0  bg-white rounded-md shadow-lg py-4 px-6 ring-1 ring-border focus:outline-none">
          {datas.map((item, index) => (
            <button
              onClick={() => item.onClick(data)}
              key={index}
              className={`flex gap-4 items-center hover:text-subMain`}
            >
              {item.icon && <item.icon className="text-md text-subMain" />}
              {item.title}
            </button>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
}

// select 2

export function Select({ children, selectedPerson, setSelectedPerson, datas }) {
  return (
    <div className="text-sm relative w-full ">
      <div className="w-full">
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          <Listbox.Button className={"w-full"}>{children}</Listbox.Button>
          <Listbox.Options className="flex  flex-col gap-4 top-10 z-50 absolute left-0 w-full bg-white rounded-md shadow-lg py-4 px-6 ring-1 ring-border focus:outline-none">
            {datas.map((person) => (
              <Listbox.Option
                className={cn("cursor-pointer text-xs hover:text-subMain", {
                  "text-gray-300 hover:text-gray-300": person.disabled,
                })}
                key={person.id}
                value={person}
                disabled={person.disabled || false}
              >
                {person.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
    </div>
  );
}

// switch
export function Switchi({ checked, onChange }) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={`${checked ? "bg-subMain" : "bg-border"}
        relative inline-flex p-[2px] w-12 cursor-pointer rounded-full transitions`}
    >
      <span
        aria-hidden="true"
        className={`${checked ? "translate-x-5" : "translate-x-0"}
          pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg  transitions`}
      />
    </Switch>
  );
}

// textarea

export function Textarea({
  label,
  name,
  register,
  placeholder,
  rows,
  ...props
}) {
  return (
    <div className="text-sm w-full">
      <label className={"text-black text-sm"}>{label}</label>
      <textarea
        {...props}
        name={name}
        rows={rows}
        {...register}
        placeholder={placeholder}
        className={`focus:border-subMain w-full bg-transparent text-sm mt-3 p-4 border border-border rounded font-light 
         `}
      />
    </div>
  );
}

// date picker

export function DatePickerComp({ label, startDate, onChange }) {
  return (
    <div className="text-sm w-full ">
      <label className={"text-black text-sm"}>{label}</label>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
      />
    </div>
  );
}

// time picker

export function TimePickerComp({ label, startDate, onChange }) {
  return (
    <div className="text-sm w-full">
      <label className={"text-black text-sm"}>{label}</label>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="h:mm aa"
        className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
      />
    </div>
  );
}

// checkbox

export function Checkbox({ label, name, onChange, checked }) {
  return (
    <div className="text-sm w-full flex flex-row items-center">
      {/* design checkbox */}
      <label className="flex-colo cursor-pointer relative">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="absolute opacity-0 w-0 h-0"
        />
        <span
          className={` border rounded  w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${checked ? "border-subMain bg-subMain" : "border-gray-300 bg-white"
            }`}
        >
          <FaCheck
            className={`text-[10px] ${checked ? "block text-white" : "hidden"}`}
          />
        </span>
      </label>

      {label && <p className={"text-black text-xs ml-2"}>{label}</p>}
    </div>
  );
}

// from to date picker

export function FromToDate({ label, startDate, onChange, endDate, bg }) {
  return (
    <div className="text-sm w-full flex flex-col gap-2">
      {label && <label className={"text-black text-sm"}>{label}</label>}
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        className={`w-full ${bg ? bg : "bg-transparent"
          }  text-xs px-4 h-14 border border-border text-main font-normal rounded-lg focus:border focus:border-subMain`}
      />
    </div>
  );
}
