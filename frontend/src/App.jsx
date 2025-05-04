import { Route, Routes } from "react-router-dom";
import "./App.css";
import { userRoutes } from "./routes/userRoutes";
import AuthGuard from "./routes/AuthGuard";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function App() {
  const routes = [...userRoutes];
  const { user } = useSelector((state) => state?.auth || {});

  return (
    <>
      <Routes>
        {routes.map(({ title, component: RenderComponent, path, checkToken }) => {
          return (
            <Route
              key={path}
              path={path}
              element={
                <AuthGuard
                  title={title}
                  checkToken={checkToken}
                >
                  <RenderComponent />
                </AuthGuard>
              }
            />
          );
        })}
        <Route
          path="*"
          element={<div>Chlaja bhosdika</div>}
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        pauseOnFocusLoss={false}
        theme="light"
      />
    </>
  );
}

export default App;

