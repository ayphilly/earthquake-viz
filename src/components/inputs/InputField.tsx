import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { type ReactNode } from "react";

interface inputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  name: string;
  value?: string | number;
  icon?: boolean;
  currency?: string;
  error?: string;
  disabled?: boolean;
  children?: ReactNode;
  autoComplete?: string;
  noBg?: boolean;
  iconStyle?: string;
  addOns?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Inputfield: React.FC<inputProps> = (props) => {
  return (
    <div className="w-full">
      <div className=" w-full flex flex-col gap-[5px] ">
        {props.label && (
          <span className="w-fit px-[5px] py-[0px] flex items-center gap-[10px]">
            <p className="my-0 font-outfit font-[300] text-[.75em] text-main-900 capitalize">
              {props.label}
            </p>
          </span>
        )}
        <div className="w-full relative">
          <input
            className={` bg-white font-outfit   w-full h-[45px] lg:h-[40px] ${
              props.icon
                ? "pl-[30px] pt-[0px]"
                : "pl-[.85em] pt-[10px] pb-[10px] "
            }   font-[300] text-[1em] outline-none
            text-main-902 rounded-[5px] bgtransparent border-[.8px] border-neutral-400 focus:border-[.8px]  
             focus:border-main-600 focus:text-main-900 focus:bg-main100 
            disabled:!bg-neutral-200 disabled:!text-neutral-900 disabled:!border-neutral-600 disabled:!cursor-not-allowed
            invalid:border-red-700 invalid:text-red-800 
            focus:invalid:border-red-800 focus:invalid:ring-red-700 ${
              props.error && "!border-main-700 border-[.5px]"
            } ${props.addOns} ${
              props?.noBg &&
              " !border-none !bg-transparent focus:!bg-transparent active:!bg-none focus:!border-0  "
            }  `}
            type={props.type || "text"}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange ? props.onChange : () => console.log()}
            disabled={props.disabled}
          />

          {props.icon && (
            <FontAwesomeIcon
              icon={faSearch}
              className={`my-0 font-[600] text-[.85em] text-neutral-500 absolute top-[30%] left-[.85em] z-5 ${props?.iconStyle} `}
            />
          )}
        </div>

        {props.children}
      </div>
    </div>
  );
};
export default Inputfield;
