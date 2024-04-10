import { useSearchParams, usePathname } from "next/navigation";
import { ChangeEvent, useCallback } from "react";
import debounce from "lodash.debounce";

export default function useUrlParam(key: string, defaultValue?: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const value = searchParams.get(key) ?? defaultValue ?? "";

  const setValue = useCallback((value: any, hash?: string) => {
    const newUrl = new URLSearchParams(searchParams.toString());
    newUrl.set(key, value);
    newUrl.set("lastUpdated", Date.now().toString());
    const path = `${pathname}?${newUrl.toString()}${hash ? `#${hash}` : ""}`;
    history.replaceState(null, "", path);
    return path;
  }, [searchParams, key, pathname]);

  const setValues = useCallback((values: [string, any][], hash?: string) => {
    const newUrl = new URLSearchParams(searchParams.toString());
    values.forEach(([key, value]) => newUrl.set(key, value));
    newUrl.set("lastUpdated", Date.now().toString());
    const path = `${pathname}?${newUrl.toString()}${hash ? `#${hash}` : ""}`;
    history.replaceState(null, "", path);
    return path;
  }, [pathname, searchParams]);

  const setValueOnChange = useCallback((time=300) => 
    debounce((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValue(e.target.value), time),
      [setValue]
    );

  return { value, setValue, setValues, setValueOnChange };
}
