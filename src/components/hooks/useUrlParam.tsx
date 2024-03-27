import { useSearchParams, usePathname } from "next/navigation";
import { ChangeEvent, useCallback } from "react";
import debounce from "lodash.debounce";

export default function useUrlParam(key: string, defaultValue?: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const value = searchParams.get(key) ?? defaultValue ?? "";

  const setValue = useCallback((value: any) => {
    const newUrl = new URLSearchParams(searchParams.toString());
    newUrl.set(key, value);
    history.replaceState(null, "", `${pathname}?${newUrl.toString()}`);
  }, [searchParams, key, pathname]);

  const setValueOnChange = useCallback((time=300) => 
    debounce((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newUrl = new URLSearchParams(searchParams.toString());
      newUrl.set(key, e.target.value);
      history.replaceState(null, "", `${pathname}?${newUrl.toString()}`);
    }, time), [key, pathname, searchParams]);

  return { value, setValue, setValueOnChange };
}
