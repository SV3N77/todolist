function Button({ onClick, children, ...props }) {
  return (
    <button
      onClick={onClick}
      className=" border-1 rounded-sm border-solid border-indigo-400 bg-indigo-100 p-1 text-xs shadow-sm shadow-indigo-500 hover:bg-indigo-200 disabled:pointer-events-none disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
