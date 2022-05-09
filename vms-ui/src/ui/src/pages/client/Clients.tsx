import usePageSelector from "../../hooks/usePageSelector";

const Clients = () => {
  usePageSelector("clients");
  return <h1>Clients Page</h1>;
};

export default Clients;
