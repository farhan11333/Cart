import { Input as ReactStrapInput, FormFeedback, Spinner, Label } from "reactstrap";
import classNames from "classnames";
import { forwardRef, useContext } from "react";
import { FormikContext } from "../context/formik"
import { v4 as uuidv4 } from "uuid";
import { capitalize } from "lodash";

const CustomInput = forwardRef((props, ref) => {
    const uniqueId = uuidv4();
    const formik = useContext(FormikContext);
    const { name, label, type, className, error, touched, disabled, ...rest } =
      props;
  
    return !formik ? (
      <label className="text-danger">FormikProvider is required</label>
    ) : (
      <div >
        <Label htmlFor={uniqueId}>{capitalize(label)}</Label>
        <ReactStrapInput
          ref={ref}
          className={classNames(className)}
          id={uniqueId}
          type={type}
          placeholder=" "
          {...formik.getFieldProps(name)}
          defaultValue={formik.values[name]}
          valid={
            (!error && touched) ||
            (!formik.errors[name] && formik.touched[name])
          }
          invalid={
            (error && touched) || (formik.errors[name] && formik.touched[name])
          }
          {...rest}
          disabled={disabled || formik.isLoading}
        >
          {props.children}
        </ReactStrapInput>
        
        <FormFeedback invalid>
          {capitalize(error || formik.errors[name])}
        </FormFeedback>
      </div>
    );
  });
  
  export default CustomInput