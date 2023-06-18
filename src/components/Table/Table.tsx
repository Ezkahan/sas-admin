import IChildren from "../../common/interfaces/IChildren";

type TableCompositionType = {
  Thead: React.FC<IChildren>;
  Tfoot: React.FC<IChildren>;
  Tbody: React.FC<IChildren>;
  Th: React.FC<IChildren>;
  Tr: React.FC<IChildren>;
  Td: React.FC<IChildren>;
};

const Table: TableCompositionType & React.FC<IChildren> = ({ children }) => {
  return (
    <main className="table-wrapper">
      <table className="table-custom">{children}</table>
    </main>
  );
};

const Tbody: React.FC<IChildren> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const Thead: React.FC<IChildren> = ({ children }) => {
  return <thead className="table-thead align-top">{children}</thead>;
};

const Tfoot: React.FC<IChildren> = ({ children, ...rest }) => {
  return <tfoot {...rest}>{children}</tfoot>;
};

const Th: React.FC<IChildren> = ({ children }) => {
  return (
    <th scope="col" className="table-th">
      {children}
    </th>
  );
};

const Tr: React.FC<IChildren> = ({ children, ...rest }) => {
  return (
    <tr className="table-tr" {...rest}>
      {children}
    </tr>
  );
};

const Td: React.FC<IChildren> = ({ children, ...rest }) => {
  return (
    <td className="table-td" {...rest}>
      {children}
    </td>
  );
};

Table.Tbody = Tbody;
Table.Thead = Thead;
Table.Tfoot = Tfoot;
Table.Th = Th;
Table.Tr = Tr;
Table.Td = Td;

export default Table;
