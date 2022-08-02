import SideBar from './SideBar';

const dashboardLayout = ({ children }) => {
  return (
    <div className="wrapper">
      <SideBar />
      <main className="content">{children}</main>
    </div>
  );
};

export default dashboardLayout;
