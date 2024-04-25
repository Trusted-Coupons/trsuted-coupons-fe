type Props = {
  id: string;
};

const Coupons = ({ params }: { params: Props }) => {
  return <p>Post:{params.id}</p>;
};

export default Coupons;
