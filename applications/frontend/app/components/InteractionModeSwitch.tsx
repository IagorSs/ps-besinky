"use client"

import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { BoldText } from "./text";
import { useEffect, useState } from "react";

const MaterialUISwitch = styled(Switch)(() => ({
  width: 62,
  height: 34,
  padding: 7,

  // Specs when is on the left
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',

    // Effect when is clicked
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',

      '& .MuiSwitch-thumb': {
        backgroundImage: 'linear-gradient(to bottom right, #E120CA, #36B7F7)',

        // Right icon
        '&::before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${
            encodeURIComponent('#fff')
          }" d="M15.8333 7.49998L16.875 5.20831L19.1666 4.16665L16.875 3.12498L15.8333 0.833313L14.7916 3.12498L12.5 4.16665L14.7916 5.20831L15.8333 7.49998ZM9.58331 7.91665L7.49998 3.33331L5.41665 7.91665L0.833313 9.99998L5.41665 12.0833L7.49998 16.6666L9.58331 12.0833L14.1666 9.99998L9.58331 7.91665ZM15.8333 12.5L14.7916 14.7916L12.5 15.8333L14.7916 16.875L15.8333 19.1666L16.875 16.875L19.1666 15.8333L16.875 14.7916L15.8333 12.5Z"/></svg>')`,
        }
      },

      // Left color when is on right
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#880378',
      },
    },
  },

  // Definition of icon mask
  '& .MuiSwitch-thumb': {
    backgroundColor: '#3F3F47',
    width: 32,
    height: 32,
    border: 0,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',

      // Left icon
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M10.8334 20C8.11669 20 5.67502 18.3417 4.66669 15.8167L2.14169 9.475C1.88336 8.81667 2.50002 8.15833 3.17502 8.375L3.83336 8.59167C4.30002 8.74167 4.68336 9.1 4.86669 9.55833L6.04169 12.5H6.66669V2.70833C6.66669 2.13333 7.13336 1.66667 7.70836 1.66667C8.28336 1.66667 8.75002 2.13333 8.75002 2.70833V10H9.58336V1.04167C9.58336 0.466667 10.05 0 10.625 0C11.2 0 11.6667 0.466667 11.6667 1.04167V10H12.5V2.29167C12.5 1.71667 12.9667 1.25 13.5417 1.25C14.1167 1.25 14.5834 1.71667 14.5834 2.29167V10H15.4167V4.79167C15.4167 4.21667 15.8834 3.75 16.4584 3.75C17.0334 3.75 17.5 4.21667 17.5 4.79167V13.3333C17.5 17.0167 14.5167 20 10.8334 20Z"/></svg>')`,
    },
  },

  // Right color when is on the left
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#3F3F47',
    borderRadius: 20 / 2,
  },
}));

export type InteractionMode = 'manual' | 'ai'

interface InteractionModeSwitchProps {
  onChange: (interactionMode: InteractionMode) => void
}

export default function InteractionModeSwitch({ onChange }: InteractionModeSwitchProps) {
  const [switchSize, setSwitchSize] = useState<"left" | 'right'>("left");

  useEffect(() => {
    onChange(switchSize === 'left' ? "manual" : "ai");
  }, [switchSize, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchSize(e.target.checked ? "right" : "left");
  }

  return (
    <div className="flex items-center">
      <BoldText className={switchSize === "left" ? "font-extrabold" : "font-light"}>Manual</BoldText>
      <MaterialUISwitch onChange={handleChange} />
      <BoldText className={switchSize === "right" ? "font-extrabold" : "font-light"}>IA</BoldText>
    </div>
  )
}
