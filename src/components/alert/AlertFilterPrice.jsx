const AlertFilterPrice = ({ errPriceMsg }) => {
  if (errPriceMsg !== "") {
    return (
      <div
        class="flex items-center border border-red-500 rounded text-sm font-medium px-4 py-3"
        role="alert"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-red-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>

        <p className="pl-3">{errPriceMsg}</p>
      </div>
    );
  }
};

export default AlertFilterPrice;
