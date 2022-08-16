const Tabs = ({ page, setPage }) => {
  return (
    <div className="w-6/12 m-auto mt-4 border-b border-gray-600 dark:border-gray-700">
      <ul className="flex justify-around flex-wrap -mb-px text-sm font-medium text-center">
        <li className="mr-2" role="presentation">
          <button
            className={`inline-block text-gray-300 p-4 rounded-t-lg ${
              page === 0
                ? "border-b-2"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }`}
            type="button"
            role="tab"
            onClick={() => setPage(0)}
          >
            MainPage
          </button>
        </li>
        <li className="mr-2" role="presentation">
          <button
            className={`inline-block text-gray-300 p-4 rounded-t-lg ${
              page === 1
                ? "border-b-2"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }`}
            type="button"
            onClick={() => setPage(1)}
          >
            TradingPage
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
