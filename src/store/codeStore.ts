import { create } from "zustand";

type CodeState = {
  code: string;
  setCode: (code: string) => void;
};

export const useCodeStore = create<CodeState>((set) => ({
  code: "",
  setCode: (code) => set({ code }),
}));


type ValidateState = {
  validate: boolean;
  setValidate: (validateCode: boolean) => void;
}

export const useValidateCodeStore = create<ValidateState>((set) => ({
  validate: false,
  setValidate: (validate) => set({ validate }),
}));