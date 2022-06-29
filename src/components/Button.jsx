function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className=" rounded-sm p-1 text-xs border-solid border-1 shadow-sm shadow-indigo-500 border-indigo-400 bg-indigo-100 hover:bg-indigo-200"
    >
      {children}
    </button>
  );
}

export default Button;
