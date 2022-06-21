import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";

const FormikTextfield = <T extends {}>(props: FormikTextfieldProps) => {
  const { name, label, type, ...rest } = { ...props };
  const { t } = useTranslation();
  const formik = useFormikContext<T>();
  const nameKey = name as keyof T;
  return (
    formik && (
      <TextField
        name={name}
        label={label}
        type={type}
        value={formik.values[nameKey] || ""}
        onChange={formik.handleChange}
        error={formik.touched[nameKey] && Boolean(formik.errors[nameKey])}
        helperText={
          (formik.touched[nameKey] as boolean) &&
          t(formik.errors[nameKey] as string, { min: 8 })
        }
        {...rest}
      >
        {rest.children}
      </TextField>
    )
  );
};

type FormikTextfieldProps = {
  name: string;
  label: string;
  type?: string;
  [rest: string]: any;
};

export default FormikTextfield;
