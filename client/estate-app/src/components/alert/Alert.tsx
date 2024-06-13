import "./alert.scss";
import style from "../../assets/style.module.scss";
import css from "classnames";
import { ReactElement, cloneElement, useState } from "react";

interface AlertProps {
  children: ReactElement;
  type: string;
  message: string;
}

const Alert = (props: AlertProps) => {
  const [isShow, setIsShow] = useState(true);

  const renderElementAlert = () => {
    return cloneElement(props.children);
  };

  const handleClose = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setIsShow(!isShow);
  };

  return (
    <div className={css(style.alert, style[props.type], !isShow && style.hide)}>
      <span className={style.closebtn} onClick={handleClose}>
        &times;
      </span>
      {props.children ? renderElementAlert() : props.message}
    </div>
  );
};

export default Alert;
