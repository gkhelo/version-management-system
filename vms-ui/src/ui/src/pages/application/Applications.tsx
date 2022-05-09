import usePageSelector from "../../hooks/usePageSelector";

const Applications = () => {
  usePageSelector("applications");
  return <h1>Applications Page</h1>;
};

export default Applications;
