import AppLayout from "../../layouts/AppLayout";

const NotFound = () => {
  return (
    <>
      <AppLayout>
        <div className="w-full absolute top-0 left-0 bottom-0 right-0  flex items-center justify-center flex-col">
          <div className="text-9xl uppercase">404</div>
          <div className="text-6xl uppercase">Not Found</div>
        </div>
      </AppLayout>
    </>
  );
};

export default NotFound;
