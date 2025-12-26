export type ApiResponse<T = null> = {
  data?: T;
  message?: string;
  status: "success" | "fail" | "error";
};
