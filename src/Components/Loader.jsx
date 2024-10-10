import { Puff } from "react-loader-spinner";

const Loader = () => {
  return <Puff color="hsl(14, 86%, 42%)" loading={true} size={100} speed={2} />;
};

export default Loader;
