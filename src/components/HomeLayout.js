import NavBar from './NavBar';
const HomeLayout = ({ children }) => {
  return (
    <div className="wrapper">
      <NavBar />
      <main className="content">{children}</main>
    </div>
  );
};

export default HomeLayout;
