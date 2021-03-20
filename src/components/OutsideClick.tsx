import React, { useEffect, useRef } from "react";

interface OutsideClickProps {
  children: any;
  onTrigger: () => void;
}

const OutsideClick: React.FC<OutsideClickProps> = ({
  children,
  onTrigger,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref && ref.current && !ref?.current?.contains(event.target)) {
        event.preventDefault();
        event.stopPropagation();
        onTrigger();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
};

export default OutsideClick;
