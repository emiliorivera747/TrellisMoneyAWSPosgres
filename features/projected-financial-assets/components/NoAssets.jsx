import React from "react";

const NoAssets = () => {
  return (
    <tbody className="bg-white">
      <tr className="">
        <td
          colSpan={3}
          rowSpan={3}
          className="px-4 py-3 whitespace-nowrap  text-gray-800 text-center text-sm h-64"
        >
          You currently do not have any holdings
        </td>
      </tr>
    </tbody>
  );
};

export default NoAssets;
