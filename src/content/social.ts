export const social = [
  { url: "mailto:pquoctrung141205@gmail.com", name: "mail" },
  { url: "https://github.com/trungpham141205", name: "github" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" }[];
