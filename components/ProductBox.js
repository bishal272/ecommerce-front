export default function ProductBox({ _id, title, description, price, images }) {
  return (
    <div className="bg-gray-200 pb-20 pt-10 px-10 rounded-md shadow-sm">
      <div>
        <img src={images[0]} alt="" />
      </div>
      <h1 className="text-center pb-10"> {title}</h1>
      <p className="flex-wrap  text-ellipsis">{description}</p>
    </div>
  );
}
