import AppLayout from "../../layouts/AppLayout";

const Forbidden = () => {
  return (
    <>
      <AppLayout>
        <div className="w-full absolute top-0 left-0 bottom-0 right-0  flex items-center justify-center flex-col">
          <div className="text-9xl uppercase">403</div>
          <div className="text-6xl uppercase">Forbidden</div>
        </div>
      </AppLayout>
    </>
  );
};

export default Forbidden;
