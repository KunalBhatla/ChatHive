import { useEffect } from "react";

const AuthGuard = ({ children, title, checkToken }) => {
  document.title = title || "ChatHive";

  console.log(window.location?.pathname);

  useEffect(() => {
    if (checkToken) console.log("call check api");
  }, [checkToken, window.location?.pathname]);

  return (
    <div>
      {children}
      <div>AuthGuard</div> {/* Just for debugging */}
    </div>
  );
};
export default AuthGuard;
