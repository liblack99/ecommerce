import {useEffect} from "react";
import {useState} from "react";
import getData from "../../Services/getData";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [text, setText] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getData(text);
        setProducts(apiData);
        setAllProducts(apiData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [text]);

  const handleSearch = (inputTitle) => {
    setText(inputTitle);
  };

  const filterByCategories = (category) => {
    if (!category) {
      setProducts(allProducts);
    } else {
      const filterCategory = allProducts.filter((product) =>
        product.category.name.toLowerCase().includes(category.toLowerCase())
      );
      setProducts(filterCategory);
    }
  };
  return [products, handleSearch, filterByCategories];
}
export default useProducts;
