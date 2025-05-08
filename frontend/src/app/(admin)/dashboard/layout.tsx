import AdminContent from "@/components/layout/admin.content";
import AdminHeader from "@/components/layout/admin.header";
import AdminSideBar from "@/components/layout/admin.sidebar";
import { AdminContextProvider } from "@/library/admin.context";
import "@/img/fontIcons";
const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AdminContextProvider>
      <div style={{ display: "flex", height: "100vh" }}>
        <div className="left-side" style={{ minWidth: "300px !important" }}>
          <AdminSideBar />
        </div>
        <div className="right-side" style={{ flex: 1 }}>
          <AdminHeader />
          <AdminContent>{children}</AdminContent>
        </div>
      </div>
    </AdminContextProvider>
  );
};

export default AdminLayout;
