import { useFormikContext } from "formik";
import _ from "lodash";
import { MenuItem } from "@mui/material";
import FormikTextfield from "./FormikTextfield";

const FormikSelect = <T extends {}>(props: FormikSelectProps) => {
  const { name, label, type, data, getValue, renderValue, ...rest } = {
    ...props,
  };
  const formik = useFormikContext<T>();
  const nameKey = name as keyof T;
  return (
    formik && (
      <FormikTextfield
        select
        defaultValue=""
        name={name}
        label={label}
        type={type}
        {...rest}
      >
        {data ? (
          [
            ...data.map((item: any) => (
              <MenuItem
                key={getValue && getValue(item)}
                value={getValue && getValue(item)}
              >
                {renderValue && renderValue(item)}
              </MenuItem>
            )),
          ]
        ) : (
          <MenuItem
            key="empty"
            value={_.get(formik.values, nameKey) as unknown as string}
          />
        )}
      </FormikTextfield>
    )
  );
};

type FormikSelectProps = {
  name: string;
  label: string;
  type?: string;
  data?: any[];
  getValue?: Function;
  renderValue?: Function;
  [rest: string]: any;
};

export default FormikSelect;
