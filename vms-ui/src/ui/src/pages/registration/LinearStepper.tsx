import { FC, useState } from "react";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

const LinearStepper: FC<LinearStepperProps> = (props: LinearStepperProps) => {
  const steps: StepInfo[] = props.steps;
  const handleSubmit = props.handleSubmit;
  const completed = props.completed;
  const { t } = useTranslation();

  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;
  const curStep = steps[activeStep];

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((info) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={info.name} {...stepProps}>
              <StepLabel>{t(info.name)}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Formik
        initialValues={curStep.initialValues}
        validationSchema={curStep.validationSchema}
        onSubmit={(values) => {
          if (isLastStep) {
            handleSubmit(values);
          } else {
            handleNext();
          }
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            {curStep.component}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={completed || isFirstStep}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                {t("back")}
              </Button>

              <Box sx={{ flex: "1 1 auto" }} />

              <Button disabled={completed} type="submit" variant="contained">
                {t(isLastStep ? "submit" : "next")}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

type StepInfo = {
  name: string;
  initialValues: {};
  validationSchema: any;
  component: JSX.Element;
};

type LinearStepperProps = {
  steps: StepInfo[];
  handleSubmit: Function;
  completed: boolean;
};

export default LinearStepper;
