import { Route, Routes } from "react-router-dom";
import "./App.css";
import { userRoutes } from "./routes/userRoutes";
import AuthGuard from "./routes/AuthGuard";

function App() {
  const routes = [...userRoutes];

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
      </Routes>
    </>
  );
}

export default App;

