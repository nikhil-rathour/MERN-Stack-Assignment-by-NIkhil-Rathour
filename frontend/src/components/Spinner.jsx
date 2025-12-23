function Spinner({ size = "w-5 h-5" }) {
  return (
    <div className={`${size} animate-spin rounded-full border-2 border-gray-300 border-t-white`}></div>
  );
}

export default Spinner;