import React, { useState } from "react";

//Functions
import { GetSvgV2 } from "@/utils/helper-functions/GetSvgV2";
import {
  cheveronUp,
  cheveronDown,
} from "@/utils/helper-functions/getCheverons";
import { getYearRanges } from "@/utils/helper-functions/getYearRanges";

//Components
import HeaderWithIcon from "@/features/projected-net-worth/components/projected-networth-graph/HeaderWithIcon";

//Types
import { GroupedDateSelectorProps } from "@/types/dashboardComponents";

const buttonStyle =
  "border-tertiary-500 font-semibold text-xs text-tertiary-800 border rounded-[12px] hover:bg-primary-800 hover:text-white hover:border-transparent hover:font-semibold transition duration-600 ease-in-out py-[0.6rem]";

const pencilSvg = GetSvgV2({
  path: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10",
  strokeWidth: 1.5,
  size: "size-4",
});

const GroupedDateSelector = ({
  years,
  currentYear,
  retirementYear,
  setSelectedYear,
}: GroupedDateSelectorProps) => {


  const [showBeforeRetirement, setShowBeforeRetirement] = useState(true);
  const [showAfterRetirement, setShowAfterRetirement] = useState(false);
  const beforeRetirementYears = years.filter((year) => year < retirementYear);
  const afterRetirementYears = years.filter((year) => year > retirementYear);

  const beforeRetirementRanges = getYearRanges(
    beforeRetirementYears,
    10,
    retirementYear
  );

  return (
    <div className="w-[50rem] h-[28rem] py-6 px-10 overflow-scroll ">
      <div className="mb-6">
        <HeaderWithIcon
          actionFunction={() => setSelectedYear(currentYear)}
          label="Retirement Year"
          icon={pencilSvg}
        />

        <div className="grid grid-cols-3 gap-2 ">
          <button
            className={buttonStyle}
            onClick={() => setSelectedYear(retirementYear)}
          >
            {retirementYear}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <HeaderWithIcon
          actionFunction={() => setShowBeforeRetirement(!showBeforeRetirement)}
          label="Before Retirement"
          icon={showBeforeRetirement ? cheveronUp() : cheveronDown()}
        />
        {showBeforeRetirement && (
          <div>
            {Object.keys(beforeRetirementRanges).map((range) => (
              <div key={range} className="mb-4">
                <h2 className=" text-tertiary-800 text-[0.8rem] mb-1">
                  {range} years until retirement
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {beforeRetirementRanges[range].map((year) => (
                    <button
                      className={buttonStyle}
                      key={year}
                      onClick={() => setSelectedYear(year)}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="">
        <HeaderWithIcon
          actionFunction={() => setShowAfterRetirement(!showAfterRetirement)}
          label="After Retirement"
          icon={showAfterRetirement ? cheveronUp() : cheveronDown()}
        />
        {showAfterRetirement && (
          <div className="grid grid-cols-6 gap-2">
            {afterRetirementYears.map((year) => (
              <button
                className={buttonStyle}
                key={year}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupedDateSelector;
