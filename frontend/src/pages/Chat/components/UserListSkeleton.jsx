import Skeleton from "react-loading-skeleton";

const UserListSkeleton = ({ count = 5 }) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="d-flex align-items-center p-2 mb-3 bg-white rounded-3 shadow-sm"
        >
          <div className="me-3">
            <Skeleton
              circle
              width={40}
              height={40}
            />
          </div>
          <div className="flex-grow-1">
            <Skeleton
              height={12}
              width="80%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              height={10}
              width="60%"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserListSkeleton;
