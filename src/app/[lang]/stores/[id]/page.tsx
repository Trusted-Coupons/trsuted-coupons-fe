type Props = {
  id: string;
};

const Store = ({ params }: { params: Props }) => {
  return <p>Post:{params.id}</p>;
};

export default Store;
