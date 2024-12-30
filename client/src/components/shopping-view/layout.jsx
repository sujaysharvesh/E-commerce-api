import ShoppingHeader from "./header";

import { Outlet } from "react-router-dom";

function ShoppingLayout() {
    return (
        <div>
            <ShoppingHeader/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default ShoppingLayout;