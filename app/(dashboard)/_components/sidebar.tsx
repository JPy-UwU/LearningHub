import Logo from "./Logo";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <Logo />
      Sidebar
    </div>
  );
}
 
export default Sidebar;