import {
  primaryLinePositiveTrendColor,
  primaryLineNegativeTrendColor,
  primaryLineNeutralTrendColor,
  secondaryLinePositiveTrendColor,
  secondaryLineNegativeTrendColor,
  secondaryLineNeutralTrendColor,
  tagTextPositiveTrendColor,
  tagTextNegativeTrendColor,
  tagTextNeutralTrendColor,
  tagBackgroundPositiveTrendColor,
  tagBackgroundNegativeTrendColor,
  tagBackgroundNeutralTrendColor,
  primarySubheaderPositiveTrendColor,
  primarySubheaderNegativeTrendColor,
  primarySubheaderNeutralTrendColor,
  secondarySubheaderPositiveTrendColor,
  secondarySubheaderNegativeTrendColor,
  secondarySubheaderNeutralTrendColor,
} from "@/features/projected-net-worth/utils/graph-helpers/graphColors";

export const lineColors1 = {
  lineColor: {
    upColor: primaryLinePositiveTrendColor,
    downColor: primaryLineNegativeTrendColor,
    flatColor: primaryLineNeutralTrendColor,
  },
  tagTextColor: {
    upColor: tagTextPositiveTrendColor,
    downColor: tagTextNegativeTrendColor,
    flatColor: tagTextNeutralTrendColor,
  },
  tagBgColor: {
    upColor: tagBackgroundPositiveTrendColor,
    downColor: tagBackgroundNegativeTrendColor,
    flatColor: tagBackgroundNeutralTrendColor,
  },
  subheaderColor: {
    upColor: primarySubheaderPositiveTrendColor,
    downColor: primarySubheaderNegativeTrendColor,
    flatColor: primarySubheaderNeutralTrendColor,
  },
};

export const lineColors2 = {
  lineColor: {
    upColor: secondaryLinePositiveTrendColor,
    downColor: secondaryLineNegativeTrendColor,
    flatColor: secondaryLineNeutralTrendColor,
  },
  tagTextColor: {
    upColor: tagTextPositiveTrendColor,
    downColor: tagTextNegativeTrendColor,
    flatColor: tagTextNeutralTrendColor,
  },
  tagBgColor: {
    upColor: tagBackgroundPositiveTrendColor,
    downColor: tagBackgroundNegativeTrendColor,
    flatColor: tagBackgroundNeutralTrendColor,
  },
  subheaderColor: {
    upColor: secondarySubheaderPositiveTrendColor,
    downColor: secondarySubheaderNegativeTrendColor,
    flatColor: secondarySubheaderNeutralTrendColor,
  },
};

export const colorConfigs = [
  lineColors1,
  lineColors2,
]
