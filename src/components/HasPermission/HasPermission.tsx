type HasPermissionType = {
  children: React.ReactElement;
  role: string;
  accessRole: string;
};

const HasPermission: React.FC<HasPermissionType> = ({
  children,
  role,
  accessRole,
}) => {
  if (role === accessRole) {
    return <>{children}</>;
  }

  return <></> ?? null;
};

export default HasPermission;
