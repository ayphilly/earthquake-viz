import { type CSSProperties, type FC, useState } from "react";

interface Props {
  text?: string;
  icon?: string;
  loading?: boolean;
  Click?: () => void;
  className?: string;
  textStyle?: CSSProperties;
  disabled?: boolean;
  type?: string;
  btnType?: "submit" | "reset" | "button";
  small?: boolean;
}

const Button: FC<Props> = ({
  text,
  icon,
  loading = false,
  Click,
  className = "",
  textStyle,
  type = "normal",
  disabled = false,
  small = false,
  btnType,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const btnClassName = `bg-sec-800 font-outfit w-full h-[56px] min-h[56px] md:h[3.75em] xl:h[4em] xl:minh-[4em] flex items-center justify-center gap-[20px] rounded-[10px] text-white capitalize text-[1em] font-[400] hover:bg-sec-900 disabled:bg-main-902 whitespace-nowrap px-[1em] disabled:cursor-not-allowed transition-all duration-300 ease-in-out
  ${small && " h-[48px]"}  ${className} `;

  const handleMouseEnter = () => {
    if (!disabled && !loading) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled && !loading) {
      setIsHovered(false);
    }
  };

  const renderButton = () => {
    switch (type) {
      case "normal":
        return (
          <button
            className={`${btnClassName} rounded-md relative overflow-hidden`}
            onClick={Click}
            type={btnType ?? "button"}
            disabled={disabled || loading}
            aria-disabled={disabled}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {loading ? (
              <p>loading...</p>
            ) : (
              <div
                className="relative overflow-hidden"
                style={{ height: "24px" }}
              >
                <div
                  className="transition-transform duration-300 ease-out "
                  style={{
                    transform: isHovered
                      ? "translateY(-24px)"
                      : "translateY(0px)",
                  }}
                >
                  {[0, 1].map((item) => (
                    <p
                      key={item.toString()}
                      style={textStyle}
                      className="m-0 h-6 flex items-center justify-center leading-6"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {icon && <img className="w-auto" src={icon} alt={text} />}
          </button>
        );

      case "secondary":
        return (
          <button
            className={`w-full  font-outfit rounded-[10px] text-sec-800 capitalize bg-transparent whitespace-nowrap px-[1em] border-[2px] border-sec-800 text-[1em] font-[400] disabled:opacity-[.7] disabled:cursor-not-allowed ${
              small ? "h-[48px]" : ""
            } ${className}`}
            type="button"
            onClick={Click}
            disabled={disabled || loading}
            aria-disabled={disabled}
          >
            {loading ? <p>loading...</p> : <>{text}</>}
          </button>
        );

      case "back":
        return (
          <button
            onClick={Click}
            className="w-fit flex items-center gap-[.5em] cursor-pointer bg-transparent outline-none"
          >
            <p>Back</p>
          </button>
        );
    }
  };

  return renderButton();
};
export default Button;
