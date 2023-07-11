type TitleType = {
  title: string;
  subtitle?: string;
};

const Title: React.FC<TitleType> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-montserrat-bold text-indigo-800">{title}</h1>
      <small className="text-indigo-500 flex gap-1">{subtitle}</small>
    </div>
  );
};

export default Title;
