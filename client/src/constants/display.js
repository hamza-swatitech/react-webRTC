import { Grid3X3, LayoutGrid, Square } from "lucide-react";

export const viewStyle = [
  {
    label: "singleScreen",
    icon: <Square />,
    activeSvg: <Square fill="#00fffb" />,
    isActive: true,
  },
  {
    label: "2xGrid",
    icon: <LayoutGrid />,
    activeSvg: <LayoutGrid fill="#00fffb" />,
    isActive: false,
  },
  {
    label: "4xGrid",
    icon: <Grid3X3 />,
    activeSvg: <Grid3X3 fill="#00fffb" />,
    isActive: false,
  },
];
