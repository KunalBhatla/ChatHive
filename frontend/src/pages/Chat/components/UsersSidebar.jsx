import UserList from "./UserList";
import { useSelector } from "react-redux";

const UsersSidebar = () => {
  const { isLoadingUsers, users, selectedUser } = useSelector((state) => state.chat);

  return (
    <div
      className="bg-white border-end"
      style={{ width: 300, height: "100%" }}
    >
      <UserList
        users={users}
        isLoading={isLoadingUsers}
        selectedUserId={selectedUser?.id}
      />
    </div>
  );
};

export default UsersSidebar;
