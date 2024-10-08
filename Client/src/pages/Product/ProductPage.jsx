import React, { useEffect, useState } from "react";
import { gym_equipment, gym_product_pricing_inr } from "../../constant";
import { base_url } from "../../Utils/baseUrl";
import Loader from "../../components/reusablesUI/Loader";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Chip, Pagination, Rating } from "@mui/material";
import { useDispatch } from "react-redux";
import { addcarts } from "../../features/cartSlice";
import { GrPowerReset } from "react-icons/gr";
import { LuEye } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState();
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Low to High");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // number of products per page
  const productsPerPage = 9;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      let url = search
        ? `${base_url}product?category=${search}`
        : `${base_url}product`;
      let response = await fetch(url);
      let data = await response.json();

      const filteredData = selectedCategories.length > 0
        ? data.filter(product => selectedCategories.includes(product.category))
        : data;
        setProducts(filteredData);
        setSortedProducts(filteredData);
        setIsLoading(false);
    };
    fetchProducts();
  }, [search, selectedCategories]);

  // filter based on selected category
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    sortProducts(e.target.value);
  };

  // debounceing
  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  };

  //  fillter searched products
  const handleSearch = debounce((searchKey) => {
    if (searchKey.trim() === "") {
      setSortedProducts(products);
    } else {
      const filteredProducts = products.filter((product) => {
        const productName = product.name.toLowerCase();
        const productDescription = product.mindiscription.toLowerCase();
        return (
          productName.includes(searchKey.trim().toLowerCase()) ||
          productDescription.includes(searchKey.trim().toLowerCase())
        );
      });
      setCurrentPage(1);
      setSortedProducts(filteredProducts);
    }
  }, 500);

  const sortProducts = (option) => {
    let sortedProducts = [...products];

    switch (option) {
      case "Low to High":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "High to Low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "Alphabetical A-Z":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Alphabetical Z-A":
        sortedProducts.sort((b, a) => a.name.localeCompare(b.name)); // fixed Z-A sorting
        break;
      default:
        break;
    }

    setSortedProducts(sortedProducts);
    setCurrentPage(1); // Reset to the first page when sorting changes
  };

  const handleAdd = (product) => {
    dispatch(addcarts(product));
    toast.success('Product added to cart successfully.')
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <div className="main-wrapper flex items-start justify-start">
        <div className="h-24"></div>
        <div className="fillter_wrapper shadow m-2 hidden p-2 min-w-[18rem] space-y-6 lg:flex justify-around flex-col relative">
          <div className="h-2"></div>
          <div className="h-12 w-full flex items-center justify-center text-3xl">
            <h1 className="w-full uppercase p-2">Filter</h1>
            <Chip
              label="Reset"
              sx={{ bgcolor: "#0A2440", color: "#fff" }}
              icon={<GrPowerReset size={18} />}
              onClick={() => setSelectedCategories([])}
            />
          </div>
          <div className="p-2 space-y-2">
            <h1 className="font-bold">Category</h1>
            <div className="flex flex-col gap-2"></div>
            <div className="no-scrollbar cursor-pointer">
              {gym_equipment.map((item, index) => (
                <div
                  className="flex gap-2 p-2 hover:bg-[#0A2440] hover:text-white rounded-md"
                  key={index}
                >
                  <input 
                  type="checkbox" 
                  className="cursor-pointer"
                  onChange={() => handleCategoryChange(item)}
                  checked={selectedCategories.includes(item)}
                   />
                  <p className="lowercase">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="product_list_all flex w-full flex-col justify-between">
          <div className="mt-4 flex lg:flex-row flex-col   justify-between items-center p-4">
            <p className="lg:text-2xl text-4xl p-2 text-center">
              Products {"("}
              {products.length}
              {")"}
            </p>
            {/* seaarch bar */}
            <div className="searchbar lg:w-2/6 w-full h-full  rounded-md  flex items-center border ">
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleSearch(e.target.value);
                }}
                className="search h-8 outline-none  rounded-l-md w-full px-4 placeholder:px-2"
                placeholder="search for product..."
              />
              <button
                className="uppercase bg-[#0A2440] rounded-r-md text-white p-2"
                onClick={() => handleSearch(search)}
              >
                <FaSearch />
              </button>
            </div>
          </div>
          <div className="flex w-full  flex-col-reverse lg:flex-row items-center justify-end pr-4 gap-3 ">
            <div className="flex items-center rounded-md w-fit border-2">
              <div className="bg-[#0A2440] rounded-l-md text-white p-2">
                <span className="">Sort by:</span>
              </div>
              <select
                value={selectedOption}
                onChange={handleSelectChange}
                className="outline-none p-2 text-black"
              >
                <option value="Low to High">Low to High</option>
                <option value="High to Low">High to Low</option>
                <option value="Alphabetical A-Z">Alphabetical A-Z</option>
                <option value="Alphabetical Z-A">Alphabetical Z-A</option>
              </select>
            </div>
            {/* <div className="flex items-center rounded-md w-fit border-2">
              <div className="bg-[#0A2440] rounded-l-md text-white p-2">
                <span className="">Price:</span>
              </div>
              <select
                value={selectedOption}
                onChange={handleSelectChange}
                className="outline-none p-2 text-black"
              >
                {gym_product_pricing_inr.map((item, i) => (
                  <option key={i} value={i}>{item}</option>
                ))}
              </select>
            </div> */}
            {/* <div className="flex items-center rounded-md w-fit border-2">
              <div className="bg-[#0A2440] rounded-l-md text-white p-2">
                <span className="">Category:</span>
              </div>
              <select
                value={selectedOption}
                onChange={handleSelectChange}
                className="outline-none p-2 text-black rounded-md"
              >
                {gym_equipment.map((item, i) => (
                  <option key={i} value={i}>{item}</option>
                ))}
              </select>
            </div> */}
          </div>
          <div className="product-list_container p-2 flex flex-wrap gap-2 w-full items-center justify-center lg:justify-start">
            {isLoading ? (
              <Loader />
            ) : (
              currentProducts.map((product) => (
                <div
                  className="card group w-[30%] border-2 p-4 rounded-md"
                  key={product._id}
                >
                  <div className="imagecontainer relative overflow-clip">
                  <Link to={`/product/${product._id}`}><Carousel
                      renderIndicator={false}
                      autoPlay={true}
                      infiniteLoop={true}
                      showStatus={false}
                      showThumbs={false}
                      showArrows={false}
                    >
                      {product.images.map((image, index) => (
                        <img
                          src={image}
                          key={index}
                          className="h-[15rem] w-auto object-cover group-hover:scale-95 duration-300"
                        />
                      ))}
                    </Carousel></Link>
                    {product?.corporateDiscount && product?.corporateDiscount !== '0' && <div className="absolute top-[10px] left-[10px]">
                        <Chip
                        sx={{ margin: "10px 0" }}
                        color="success"
                        size="small"
                        label={"upto " + product.corporateDiscount + "% off"}
                      />
                    </div>}
                  </div>
                  <div className="product-detail">
                    <div className="stack-1 flex justify-between p-2">
                      {/* {product.corporateDiscount > 0 ? (
                        <Chip
                        sx={{ margin: "10px 0" }}
                        color="success"
                        size="small"
                        label={"upto " + product.corporateDiscount + "% off"}
                      />
                      ) : (
                        <div></div>
                      )} */}
                      <div className="icon flex items-center gap-4 text-xl">
                        {/* <Link to={`/product/${product._id}`}>
                          <div className="preview-icon">
                            <LuEye />
                          </div>
                        </Link> */}
                        {/* <div className="preview-icon">
                          <CiHeart />
                        </div> */}
                      </div>
                    </div>
                    <div className="stack-2 p-2 group">
                    <Link to={`/product/${product._id}`}><h1 className="text-xl font-bold group-hover:underline h-[3.5rem] overflow-clip">
                        {product.name}
                      </h1></Link>
                      <p className="rating flex items-center gap-2">
                        <Rating
                          name="size-small"
                          defaultValue={4}
                          precision={0.5}
                          size="small"
                        />
                        <span className="rating-value">
                          {product.rating / 5 || 4.9}
                        </span>
                        <span className="rating-count">
                          {product.reviews || 110}
                          {"+"}
                        </span>
                      </p>
                    </div>
                    <div className="price flex text-xl gap-2 px-2">
                      <div className="flex items-center gap-x-1">
                        <span
                          style={{
                            textDecoration: `${
                              product.corporateDiscount > 0
                                ? "line-through"
                                : ""
                            }`,
                            color: `${
                              product.corporateDiscount > 0
                                ? "#ff5050"
                                : "#0a2440"
                            }`,
                            fontSize: `${
                              product.corporateDiscount > 0 ? "15px" : "20px"
                            }`,
                          }}
                          className="font-bold"
                        >
                          &#8377;{(+product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                        </span>
                        {product.corporateDiscount > 0 && (
                          <span className="text-[20px] font-bold text-[#0a2440]">
                            &#8377;
                            {(product.price -
                              product.price * (product.corporateDiscount / 100)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="button w-full flex items-center justify-center p-2 text-white" onClick={() => handleAdd(product)}>
                      <button className='bg-[#0A2440] p-2 w-full rounded-md'>Add To Cart</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="pagination w-full flex items-center justify-center p-4 m-2">
            <Pagination
              count={Math.ceil(sortedProducts.length / productsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
