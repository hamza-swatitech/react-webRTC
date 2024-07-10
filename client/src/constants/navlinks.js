import {
  homeActiveSvg,
  activeEyeSvg,
  homeSvg,
  eyeSvg,
  reportsSvg,
  settingSvg,
  activeReportSvg,
} from "./svgs";
export const links = [
  {
    label: "Dashboard",
    path: "/",
    icon: homeSvg,
    activeIcon: homeActiveSvg,
  },
  {
    label: "Viewer",
    path: "/stream",
    icon: eyeSvg,
    activeIcon: activeEyeSvg,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: reportsSvg,
    activeIcon: activeReportSvg,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: settingSvg,
    activeIcon: settingSvg,
  },
];
