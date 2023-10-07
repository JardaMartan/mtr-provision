export const OFF = "Off";
export const MANUAL = "Manual";
export const PAC_URL = "PACUrl";
export const WPAD = "WPAD";
export const PROXY_MODES = [OFF, MANUAL, PAC_URL, WPAD];
export const PROXY_MODES_MAP = {
  [OFF]: OFF,
  [MANUAL]: MANUAL,
  [PAC_URL]: PAC_URL,
  [WPAD]: WPAD,
};

export const PROXY_MODES_OPTIONS = [
  { value: OFF, label: OFF },
  { value: MANUAL, label: MANUAL },
  { value: PAC_URL, label: PAC_URL },
  { value: WPAD, label: WPAD },
];

export const PROXY_MODES_OPTIONS_MAP = {
  [OFF]: { value: OFF, label: OFF },
  [MANUAL]: { value: MANUAL, label: MANUAL },
  [PAC_URL]: { value: PAC_URL, label: PAC_URL },
  [WPAD]: { value: WPAD, label: WPAD },
};
