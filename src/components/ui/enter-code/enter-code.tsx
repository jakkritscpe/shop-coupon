"use client";
import { useCodeStore, useValidateCodeStore } from "@/store/codeStore";

const EnterCode = () => {
  const { code, setCode } = useCodeStore();
  const { setValidate } = useValidateCodeStore();

  const validateCode = (code: string) => {
    const oddNumberRegex = /^[0-9]*[13579]$/;
    return oddNumberRegex.test(code);
  };

  const handleValidateCode = (code: string) => {
    setCode(code);
    setValidate(validateCode(code));
  };

  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">กรุณากรอกรหัส ?</span>
      </div>
      <input
        type="text"
        placeholder="code"
        className="input input-bordered w-full max-w-xs"
        value={code}
        onChange={(e) => handleValidateCode(e.target.value)}
      />
      <div className="label">
        <span className="label-text-alt text-red-500">
          {code && !validateCode(code) && "กรุณาตรวจสอบโค้ดของคุณ"}
        </span>
      </div>
    </label>
  );
};

export default EnterCode;
