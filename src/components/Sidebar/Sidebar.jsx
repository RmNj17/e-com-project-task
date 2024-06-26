import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSidebarStatus, setSidebarOff } from "../../store/sidebarSlice";
import productData from "../../utils/products.json";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOn = useSelector(getSidebarStatus);
  const products = productData?.products;
  const categories = [...new Set(products?.map((product) => product.category))];
  const categoryProducts = {};

  categories.forEach((category) => {
    categoryProducts[category] = products.filter(
      (product) => product.category === category
    );
  });

  return (
    <aside className={`sidebar ${isSidebarOn ? "hide-sidebar" : ""}`}>
      <button
        type="button"
        className="sidebar-hide-btn"
        onClick={() => dispatch(setSidebarOff())}
      >
        <i className="fas fa-times"></i>
      </button>
      <div className="sidebar-cnt">
        <div className="cat-title fs-17 text-uppercase fw-6 ls-1h">
          All Categories
        </div>
        <ul className="cat-list">
          {categories.map((category, idx) => {
            return (
              <li key={idx} onClick={() => dispatch(setSidebarOff())}>
                <Link
                  to={`category/${category}`}
                  className="cat-list-link text-capitalize"
                >
                  {category.replace("-", " ")}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
