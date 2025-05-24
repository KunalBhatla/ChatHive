import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./SideBar";
import { toggleDrawer } from "../stores/sidebarStore/sidebarSlice";

const SidebarComponent = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  return (
    <div
      className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
      style={{
        width: isOpen ? "250px" : "60px",
        transition: "width 0.3s",
      }}
    >
      <button onClick={() => dispatch(toggleDrawer())}>
        {isOpen ? "Close" : "Open"}
      </button>
      <Sidebar />
    </div>
  );
};

export default SidebarComponent;
