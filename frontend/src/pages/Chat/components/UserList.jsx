import { useDispatch, useSelector } from "react-redux";
import { handleSelectUser } from "../../../stores/chatStore/chatSlice";
import UserItem from "./UserItem";
import UserListSkeleton from "./UserListSkeleton";

const UserList = ({ users, isLoading, selectedUserId }) => {
  const dispatch = useDispatch();
  const { user: currentLoggedInUser } = useSelector((state) => state?.auth);
  const { onlineUsers } = useSelector((state) => state.socket);

  return (
    <div
      className="p-3 h-100 overflow-auto border-end"
      style={{
        backgroundColor: "#F6EEF7",
        minWidth: "280px",
        maxWidth: "320px",
      }}
    >
      <h5
        className="mb-4"
        style={{
          color: "#6A4573",
          fontWeight: "bold",
          borderBottom: "2px solid #C8A2C8",
          paddingBottom: "8px",
        }}
      >
        Users
      </h5>

      {isLoading ? (
        <UserListSkeleton count={5} />
      ) : !isLoading && users.length === 0 ? (
        <p className="text-muted">No users found.</p>
      ) : (
        users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            isActive={user.id === selectedUserId}
            onClick={() => dispatch(handleSelectUser(user))}
            isCurrentUser={user.id === currentLoggedInUser?.id}
            isOnline={onlineUsers?.includes(user?.id || false)}
          />
        ))
      )}
    </div>
  );
};

export default UserList;
