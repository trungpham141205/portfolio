const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export const withBase = (path: string) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}` || "/";
};

export const useRouter = () => {
  const push = (path: string) => {
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", withBase(path));
    }
  };

  const replace = (path: string) => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", withBase(path));
    }
  };

  const back = () => {
    if (typeof window !== "undefined") {
      window.history?.back?.();
    }
  };

  return { push, replace, back };
};
