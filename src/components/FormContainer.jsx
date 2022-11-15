import classNames from "classnames";

export const FormContainer = ({ children, className, ...props }) => {
  return (
    <div className={classNames("lis-form-container", className)} {...props}>
      {children}
    </div>
  );
};

const Item = ({ children, className, ...props }) => {
  return (
    <div className={classNames("lis-form-item", className)} {...props}>
      {children}
    </div>
  );
};

// attach Item to FormContainer
FormContainer.Item = Item;
