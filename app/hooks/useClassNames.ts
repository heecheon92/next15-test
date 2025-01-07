const sesameClassNames = {
  input:
    "h-[36px] w-full flex-1 rounded-[6px] py-1 pl-2 text-sm font-normal text-NS-20 outline outline-1 outline-NS-4 focus:outline-[1.5px] disabled:cursor-not-allowed sm:w-[20%] disabled:text-NS-6",
  btn_primary:
    "bg-S-600 hover:bg-S-800 active:bg-S-1000 disabled:bg-S-600 gap-[8px] rounded-[6px] px-[16px] py-[8px] text-[14px] leading-[24px] text-[#FFFFFF] font-[500] disabled:cursor-not-allowed disabled:opacity-50",
  btn_secondary:
    "hover:bg-S-100 active:bg-S-600 border-S-600 disabled:text-S-600 text-S-600 gap-[8px] rounded-[6px] border-[1px] bg-white px-[16px] py-[8px] text-[14px] font-[500] leading-[24px] active:text-[#FFFFFF] disabled:cursor-not-allowed disabled:bg-white disabled:opacity-50",
  btn_tertiary:
    "hover:bg-Gr-100 active:bg-NS-4 border-NS-4 text-NS-20 gap-[8px] rounded-[6px] border-[1px] bg-white px-[16px] py-[8px] text-[14px] font-[500] leading-[24px] active:text-[#FFFFFF] disabled:cursor-not-allowed disabled:bg-white disabled:opacity-50",
  btn_destructive:
    "bg-R-600 hover:bg-R-800 active:bg-R-1000 disabled:bg-R-600 gap-[8px] rounded-[6px] px-[16px] py-[8px] text-[14px] leading-[24px] text-[#FFFFFF] font-[500] disabled:cursor-not-allowed disabled:opacity-50",
  btn_text:
    "text-S-600 gap-[10px] bg-white px-[16px] py-[8px] text-[14px] font-[500] leading-[24px] disabled:cursor-not-allowed disabled:opacity-50",
  btn_text_container:
    "gap-[10px] rounded-[6px] bg-white px-[16px] py-[8px] text-[14px] font-[500] leading-[24px] text-S-600 hover:bg-S-100 active:bg-S-200 disabled:cursor-not-allowed disabled:bg-white disabled:opacity-50",
  btn_icon:
    "w-[16px] h-[16px] p-[8px] hover:bg-Gr-100 active:bg-Gr-100 disabled:opacity-50 disabled:cursor-not-allowed",
  tooltip:
    "shadow-[2px_4px_12px_0px_rgba(0, 0, 0, 0.25)] flex flex-col whitespace-pre bg-white text-start text-[12px] font-normal text-NS-600",
  toast: {
    icon: "w-[40px] h-[40px]",
    title: "text-[14px] leading-[20px] font-[600] text-NS-20 truncate",
    description:
      "text-[14px] leading-[20px] font-[400] text-NS-20 whitespace-pre",
  },
} as const;

export function useClassNames() {
  return {
    classNames: sesameClassNames,
    cns: sesameClassNames,
  };
}
