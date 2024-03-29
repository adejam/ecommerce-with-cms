import Container from "@/components/ui/container"
import NavbarActions from "./navbar-actions"
import MainNav from "./main-nav"
import { serverTrpc } from "@/trpc/server"
import Brand from "./brand"

const Navbar = async ({ storeId }: { storeId: string }) => {
  const categories = await serverTrpc.category.fetchCategories(storeId)
  const store = await serverTrpc.store.fetchStoreById(storeId)

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Brand initialData={store} storeId={storeId} />
          <MainNav initialData={categories} storeId={storeId} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  )
}

export default Navbar
