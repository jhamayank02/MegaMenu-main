// const token = localStorage.setItem("token");
const token = localStorage.getItem("token");

export const config = {
  headers: {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};
