import { FC, MouseEventHandler, useState } from "react";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";

const LinearStepper: FC<LinearStepperProps> = (props: LinearStepperProps) => {
  const steps: StepInfo[] = props.steps;
  const handleSubmit = props.handleSubmit;

  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((info) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={info.name} {...stepProps}>
              <StepLabel>{info.name}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {steps[activeStep].component}

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={isFirstStep}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>

        <Box sx={{ flex: "1 1 auto" }} />

        <Button onClick={isLastStep ? handleSubmit : handleNext}>
          {isLastStep ? "Submit" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

type StepInfo = {
  name: string;
  component: JSX.Element;
};

type LinearStepperProps = {
  steps: StepInfo[];
  handleSubmit: MouseEventHandler;
};

export default LinearStepper;
