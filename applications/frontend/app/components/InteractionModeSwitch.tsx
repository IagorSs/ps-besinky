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
    backgroundColor: '#6a6a79',
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
    },
  },

  // Right color when is on the left
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#3F3F47',
    borderRadius: 20 / 2,
  },
}));

type SwitchSize = 'left' | 'right';

export type InteractionMode = 'manual' | 'ai'

interface InteractionModeSwitchProps {
  disabled?: boolean
  onChange: (interactionMode: InteractionMode) => void
}

export default function InteractionModeSwitch({ disabled, onChange }: InteractionModeSwitchProps) {
  const [switchSize, setSwitchSize] = useState<SwitchSize>("left");

  useEffect(() => {
    onChange(switchSize === 'left' ? "manual" : "ai");
  }, [switchSize, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchSize(e.target.checked ? "right" : "left");
  }

  const getFontWeight = (switchSizeRelated: SwitchSize): string => {
    const selectedModeFontWeight = "font-extrabold";
    const unselectedModeFontWeight = "font-light";

    return switchSizeRelated === switchSize ? selectedModeFontWeight : unselectedModeFontWeight;
  }

  return (
    <div className="flex items-center">
      <BoldText fontWeight={getFontWeight("left")}>Manual</BoldText>
      <MaterialUISwitch disabled={disabled} onChange={handleChange} />
      <BoldText fontWeight={getFontWeight("right")}>IA</BoldText>
    </div>
  )
}
